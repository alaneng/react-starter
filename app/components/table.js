const Pui = require('pui-react-table');
const {TableCell, TableRow} = Pui;
const React = require('react');

const {mergeProps} = require('pui-react-helpers');

function rows(data) {
  const {columns, CustomRow} = this.props;

  return data.map((datum, rowKey) => {
    const cells = columns.map((column, key) => {
      const {attribute, CustomCell} = column;
      const Cell = CustomCell || TableCell;
      return <Cell {...{column}} key={key} index={rowKey} value={datum[attribute]} rowDatum={datum}>{datum[attribute]}</Cell>;
    });

    const Row = CustomRow || TableRow;
    return <Row {...{columns}} key={rowKey} index={rowKey}>{cells}</Row>;
  });
};

class Table extends Pui.Table {
  render() {
    const {sortColumn} = this.state;
    const {data} = this.props;
    const props = mergeProps(this.props, {className: ['table', 'table-sortable', 'table-data']});

    const rows = (sortColumn === -1) ? this.rows(data) : this.sortedRows();

    return (
      <table {...props} >
        <thead>
          <tr>{this.renderHeaders()}</tr>
        </thead>
        {rows}
      </table>
    );
  }
};

Table.prototype.rows = rows;

function CustomCell({column: {format} = {}, children, ...props}) {
  return <td {...props}>{format ? numeral(children).format(format) : children}</td>
}

class CustomRow extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      expanded: false
    }
  };


  toggleRow = () => {
    this.setState({
      expanded: !this.state.expanded
    })
  };

  render() {
    var {children, index, columns = []} = this.props;
    var {expanded} = this.state;

    let {props: {rowDatum: {rows = []} = {}} = {}} = children[index] || {};

    rows = rows.map((data, i) => {
      // console.log('index:', index)
      // console.log('data:', data)
      const cells = columns.map((column, j) => {
        return <CustomCell {...{column}} key={j}>{data[column.attribute]}</CustomCell>
      });

      return <tr className='subrow' key={`${i}-${index}`}>{cells}</tr>
    });

    return (
      <tbody>
        <tr className={classnames({expanded})} onClick={this.toggleRow}>
          {children}
        </tr>
        {expanded && rows}
      </tbody>
    );
  }
};

module.exports = {
  Table, TableRow: Pui.TableRow, CustomRow, CustomCell
};

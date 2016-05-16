import {Table, TableRow, CustomRow, CustomCell} from './table';
import data from '../../data';

require('babel-polyfill');
const Bootstrap = require('../bootstrap');
const React = require('react');
const types = React.PropTypes;
const {useStore} = require('p-flux');
const {useRouter} = require('./use_router');
const Router = require('./router');


require('pui-css-alignment');
require('pui-css-ellipsis');
require('pui-css-typography');
require('pui-css-whitespace');

class Application extends React.Component {
  static propTypes = {
    config: types.object.isRequired,
    store: types.object.isRequired,
    router: types.oneOfType([types.object, types.func])
  };

  render() {

    var columns = [
      {
        attribute: 'abc',
        displayName: 'Foo',
        sortable: false,
        format: '0%',
        CustomCell
      },
      {
        attribute: 'cde',
        displayName: 'Bar',
        sortable: false,
        format: '0.00',
        CustomCell
      },
      {
        attribute: 'xyz',
        displayName: 'Baz',
        sortable: false,
        format: '0,0',
        CustomCell
      }
    ];

    const {config, store, router} = this.props;
    return (
      <div className="pui-react-starter">
        <Table className='datatable' columns={columns} data={data} {...{CustomRow}} />
      </div>
    );
  }
}

const EnhancedApplication = useStore(useRouter(Application),
  {
    store: require('../store'),
    actions: [],
    dispatcherHandlers: [require('../dispatchers/main_dispatcher')],
    /* eslint-disable no-console */
    onDispatch: (event) => {console.info('dispatching event', event);}
    /* eslint-enable no-console */
  }
);

Bootstrap.init(EnhancedApplication);

module.exports = EnhancedApplication;

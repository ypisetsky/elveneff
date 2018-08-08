'use strict';
import widget.js;

class WidgetRow extends React.Component {
  render() {
    return <table class="widgetRow">
      <tr><th class="rowTitle" colspan="3">
        <div class="rowTitle">Basic Goods</div>
      </th></tr>
      <tr>
        <td><div class="widget">Marble</div></td>
        <td><div class="widget">Steel</div></td>
        <td><div class="widget">Planks</div></td>
      </tr>
    </table>;
  }
}

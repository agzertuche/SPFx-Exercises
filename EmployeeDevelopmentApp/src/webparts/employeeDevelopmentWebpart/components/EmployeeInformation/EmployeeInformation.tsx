import * as React from 'react';
import { IEmployeeInformationProps } from './IEmployeeInformationProps';
import { IEmployeeInformationState } from './IEmployeeInformationState';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import {
  DetailsList,
  buildColumns,
} from 'office-ui-fabric-react/lib/DetailsList';

let _items: any[];

export default class EmployeeInformation extends React.Component<IEmployeeInformationProps,IEmployeeInformationState>{
  constructor(props: {}) {
    super(props);

    _items = _items || this.props.users;
    
    this._onColumnClick = this._onColumnClick.bind(this);

    this.state = {
      sortedItems: _items,
      columns: _buildColumns()
    };
  }

  private _onColumnClick(event, column) {
    let { sortedItems, columns } = this.state;
    let isSortedDescending = column.isSortedDescending;

    // If we've sorted this column, flip it.
    if (column.isSorted) {
      isSortedDescending = !isSortedDescending;
    }

    // Sort the items.
    sortedItems = sortedItems.concat([]).sort((a, b) => {
      let firstValue = a[column.fieldName];
      let secondValue = b[column.fieldName];

      if (isSortedDescending) {
        return firstValue > secondValue ? -1 : 1;
      } else {
        return firstValue > secondValue ? 1 : -1;
      }
    });

    // Reset the items and columns to match the state.
    this.setState({
      sortedItems: sortedItems,
      columns: columns.map(col => {
        col.isSorted = (col.key === column.key);

        if (col.isSorted) {
          col.isSortedDescending = isSortedDescending;
        }

        return col;
      })
    });
  }

  public render(): React.ReactElement<{}>{
    let { sortedItems, columns } = this.state;
    
    return (
      <div className="ms-Grid-row ms-u-fadeIn200"> 
        <div className="ms-Grid-col ms-u-sm12">          
          <DetailsList
            items={ sortedItems }
            columns={ columns }
            onRenderItemColumn={ _renderItemColumn }
            onColumnHeaderClick={ this._onColumnClick }  
          />
        </div>
      </div>
    );
  }
}

function _buildColumns() {
  let columns = buildColumns(_items);
  let filteredColumns = columns.filter((c) => {
    switch (c.name) {
      case "imageUrl":
      case "displayName":
      case "mail":      
      case "department":
      case "city":
        return c;
      default:
    }    
  });

  let thumbnailColumn = filteredColumns.filter(column => column.name === 'imageUrl')[0];
  
  // Special case one column's definition.
  thumbnailColumn.name = 'imageUrl';
  thumbnailColumn.maxWidth = 50;

  return filteredColumns;
}

function _renderItemColumn(item, index, column) {
  let fieldContent = item[column.fieldName];

  switch (column.key) {
    case 'imageUrl':
      return <Image src={ fieldContent } width={ 50 } height={ 50 } imageFit={ ImageFit.cover } />;
    case 'displayName':
      return <Link href='#'>{ fieldContent }</Link>;
    default:
      return <span>{ fieldContent }</span>;
  }
}
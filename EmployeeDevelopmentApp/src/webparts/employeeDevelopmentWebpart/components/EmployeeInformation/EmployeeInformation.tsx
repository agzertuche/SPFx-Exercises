import * as React from 'react';
import { 
  IEmployeeInformationProps,
  items, 
  overflowItems,
  farItems
} from './IEmployeeInformationProps';
import { IEmployeeInformationState } from './IEmployeeInformationState';
import styles from './styles.module.scss';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import {
  DetailsList,
  buildColumns,
} from 'office-ui-fabric-react/lib/DetailsList';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';

let _items: any[];

export default class EmployeeInformation extends React.Component<IEmployeeInformationProps,IEmployeeInformationState>{
  constructor(props: IEmployeeInformationProps) {
    super(props);

    _items = _items || this.props.users;
    
    this._onColumnClick = this._onColumnClick.bind(this);

    this.state = {
      sortedItems: _items,
      columns: _buildColumns(),
      showModal: false
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

  private _showModal() {
    this.setState({ showModal: true });
  }

  private _closeModal() {
    this.setState({ showModal: false });
  }

  public render(): React.ReactElement<{}>{
    let { sortedItems, columns, showModal } = this.state;
    
    return (
      <div className={styles.employeeInformation}>
        <div className="ms-Grid-row ms-u-slideDownIn20"> 
          <div className={`${styles.detailsList} ms-Grid-col ms-u-sm12`}>
            <CommandBar
              searchPlaceholderText='Search...'
              elipisisAriaLabel='More options'
              items={ items }
              overflowItems={ overflowItems }
              farItems={ farItems  }
            />     
            <DetailsList
              items={ sortedItems }
              columns={ columns }
              onRenderItemColumn={ _renderItemColumn }
              onColumnHeaderClick={ this._onColumnClick }  
            />
          </div>
        </div>
      </div>
    );
  }
}

function _buildColumns() {
  let columns = buildColumns(_items);
  let filteredColumns = columns.filter((c) => {
    c.maxWidth = 100;
    switch (c.name) {
      case "imageUrl":
        c.name = "Thumbnail";
        return c;
      case "displayName":
        c.name = "Name";        
        return c;
      case "mail":      
        c.name = "e-Mail";
        return c;
      case "department":
        c.name = "Department";
        return c;
      case "city":
        c.name = "City";
        return c;
      case "jobTitle":
        c.name = "Job Title";
        return c;
      case "country":
        c.name = "Country";
        return c;
      default:
    }    
  });

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
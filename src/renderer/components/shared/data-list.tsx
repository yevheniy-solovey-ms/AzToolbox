import * as React from 'react';
// import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';
import { DetailsList, DetailsListLayoutMode, Selection, IColumn, IDetailsListStyles, IGroup } from '@fluentui/react/lib/DetailsList';
// import { mergeStyles } from '@fluentui/react/lib/Styling';

// const exampleChildClass = mergeStyles({
//   display: 'block',
//   // marginBottom: '10px',
// });

const gridStyles: Partial<IDetailsListStyles> = {
  headerWrapper: { height: '5vh', overflow: 'hidden' },
  contentWrapper: {
    height: '89vh',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
};

// const textFieldStyles: Partial<ITextFieldStyles> = { root: { maxWidth: '300px', height: '6vh' } };

export interface IDataListItem {
  key: string;
  name: string;
}

export interface IDataListProps {
  data: IDataListItem[];
  groups?: IGroup[];
  columnName: string;
  onSelect: (selectedIds: string[]) => void;
}

export interface IDataListState {
  items: IDataListItem[];
  selectionDetails: string;
}

export class DataList extends React.Component<IDataListProps, IDataListState> {
  private selection: Selection;
  private columns: IColumn[];

  constructor(props: IDataListProps) {
    super(props);

    this.selection = new Selection({
      onSelectionChanged: () => {
        this.props.onSelect(this.selection.getSelection().map((selectedItem) => (selectedItem.key ? selectedItem.key.toString() : '')));
        this.setState({ selectionDetails: this.getSelectionDetails() });
      },
    });

    this.columns = [{ key: 'column1', name: this.props.columnName, fieldName: 'name', minWidth: 100 }];

    this.state = {
      items: props.data,
      selectionDetails: this.getSelectionDetails(),
    };
  }

  componentWillReceiveProps(nextProps: IDataListProps) {
    this.setState({ items: nextProps.data });
  }

  private getSelectionDetails(): string {
    const selectionCount = this.selection.getSelectedCount();

    switch (selectionCount) {
      case 0:
        return 'No items selected';
      case 1:
        return '1 item selected: ' + (this.selection.getSelection()[0] as IDataListItem).name;
      default:
        return `${selectionCount} items selected`;
    }
  }

  // private onFilter = (_: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: string | undefined): void => {
  //   this.setState({
  //     items: text ? this.props.data.filter((i) => i.name.toLowerCase().indexOf(text) > -1) : this.props.data,
  //   });
  // };

  private onItemInvoked = (item: IDataListItem): void => {
    alert(`Item invoked: ${item.name}`);
  };


  public render(): JSX.Element {
    const { items } = this.state;

    return (
      <div style={{ flexGrow: 1, width: '30%', height: '95vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {/* <TextField className={exampleChildClass} label="Filter by name:" onChange={this.onFilter} styles={textFieldStyles} /> */}
        <DetailsList
          styles={gridStyles}
          items={items}
          groups={this.props.groups}
          columns={this.columns}
          setKey="set"
          layoutMode={DetailsListLayoutMode.justified}
          selection={this.selection}
          selectionPreservedOnEmptyClick
          checkButtonAriaLabel="select row"
          onItemInvoked={this.onItemInvoked}
        />
      </div>
    );
  }
}

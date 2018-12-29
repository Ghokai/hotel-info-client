import React, { Component } from "react";
import { connect } from "react-redux";
import {
  PagingState,
  IntegratedPaging,
  RowDetailState,
  SearchState,
  IntegratedFiltering
} from "@devexpress/dx-react-grid";

import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  TableRowDetail,
  Toolbar,
  SearchPanel
} from "@devexpress/dx-react-grid-bootstrap4";

//hotel info detail
const RowDetail = ({ row }) => {
  const { name, address, stars, contact, phone, uri } = row;

  const starIcons = Array.apply(null, { length: stars }).map((e, i) => (
    <span className="oi oi-star" key={i} />
  ));

  const adrressLink =
    "https://www.google.com/maps/search/?api=1&query=" + address;

  return (
    <div className="card ">
      <div className="card-header">
        <h5>
          <u>{name}</u> {starIcons}
        </h5>
      </div>
      <div className="card-body">
        <p>
          <span className="oi oi-person" />
          {contact}
        </p>
        <p>
          <span className="oi oi-phone" />
          {phone}
        </p>
        <p>
          <span className="oi oi-globe" />
          <a target="_blank" rel="noopener noreferrer" href={uri}>
            {uri}
          </a>
        </p>
        <p>
          <span className="oi oi-map" />
          <a target="_blank" rel="noopener noreferrer" href={adrressLink}>
            {address}
          </a>
        </p>
      </div>
    </div>
  );
};

class HotelInfoViewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: "name", title: "Name" },
        { name: "address", title: "Address" },
        { name: "stars", title: "Stars" },
        { name: "contact", title: "Contact" },
        { name: "phone", title: "Phone" },
        { name: "uri", title: "Uri" }
      ],
      pageSizes: [10, 20, 50, 100, 0],
      expandedRowIds: [],
      searchValue: "",
      currentPage: 0,
      pageSize: 10
    };

    this.changeExpandedDetails = expandedRowIds =>
      this.setState({ expandedRowIds });
    this.changeSearchValue = value => this.setState({ searchValue: value });
    this.changeCurrentPage = currentPage => this.setState({ currentPage });
    this.changePageSize = pageSize => this.setState({ pageSize });
  }

  componentWillReceiveProps() {
    this.setState({
      expandedRowIds: [],
      searchValue: "",
      currentPage: 0,
      pageSize: 10
    });
  }

  render() {
    const {
      columns,
      pageSizes,
      expandedRowIds,
      searchValue,
      currentPage,
      pageSize
    } = this.state;
    const { hotelInfoList } = this.props;

    if (hotelInfoList === null || hotelInfoList.length === 0) {
      return null;
    }

    //renders data list with devexpress reactive grid
    return (
      <Grid rows={hotelInfoList} columns={columns}>
        <SearchState
          value={searchValue}
          onValueChange={this.changeSearchValue}
        />
        <IntegratedFiltering />
        <PagingState
          currentPage={currentPage}
          onCurrentPageChange={this.changeCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={this.changePageSize}
          defaultCurrentPage={0}
          defaultPageSize={10}
        />
        <IntegratedPaging />
        <RowDetailState
          expandedRowIds={expandedRowIds}
          onExpandedRowIdsChange={this.changeExpandedDetails}
        />
        <Table />
        <TableHeaderRow />
        <TableRowDetail contentComponent={RowDetail} />
        <PagingPanel pageSizes={pageSizes} />
        <Toolbar />
        <SearchPanel />
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  const {
    hotelInfo: { hotelInfoList }
  } = state;

  return {
    hotelInfoList
  };
};
//connect component to redux store
export default connect(mapStateToProps)(HotelInfoViewer);

import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import * as actions from "../state/actions";

const SortFields = [
  { value: "", label: "..." },
  { value: "Name", label: "Name" },
  { value: "Address", label: "Address" },
  { value: "Stars", label: "Stars" },
  { value: "Contact", label: "Contact" },
  { value: "Phone", label: "Phone" },
  { value: "Uri", label: "Uri" }
];

const SortDirections = [
  { value: "", label: "..." },
  { value: "Asc", label: "Ascending" },
  { value: "Desc", label: "Descending" }
];

class HotelInfoForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: null,
      selectedSortField: null,
      selectedSortDirection: null,
      fileNamePlaceholder: "You can select file by dragging or clicking :)"
    };
  }

  //create request FormData object from form
  getFormData = () => {
    const { selectedSortField, selectedSortDirection, files } = this.state;

    if (files == null || files.length === 0) {
      this.props.setWarning("You Should Choose a file!");
      return null;
    }

    let form = new FormData();

    if (files != null) {
      for (var index = 0; index < files.length; index++) {
        var element = files[index];
        form.append("file", element);
      }
    }

    if (selectedSortField != null) {
      form.append("SortField", selectedSortField.value);
    }

    if (selectedSortDirection != null) {
      form.append("SortDirection", selectedSortDirection.value);
    }

    return form;
  };

  //upload file to server
  async uploadForm(e) {
    e.preventDefault();

    const formData = this.getFormData();
    if (formData == null) {
      return;
    }

    this.props.uploadFile(formData);
  }

  //validate and return data from server
  async ValidateFile(e) {
    e.preventDefault();

    const formData = this.getFormData();
    if (formData == null) {
      return;
    }

    this.props.validateFile(formData);
  }

  filesOnChange(sender) {
    let files = sender.target.files;
    let fileName = "";

    if (files.length > 0) {
      fileName = files[0].name;
    }

    this.setState({
      files,
      fileNamePlaceholder: fileName
    });
  }

  handleSortFieldChange = value => {
    this.setState({ selectedSortField: value });
  };

  handleSortDirectionChange = value => {
    this.setState({ selectedSortDirection: value });
  };

  render() {
    const {
      selectedSortField,
      selectedSortDirection,
      fileNamePlaceholder
    } = this.state;
    const { operationMessage, status } = this.props;

    let messageComponent = null;

    //build result panel with request message and request status
    if (operationMessage != null && operationMessage.length > 0) {
      messageComponent = (
        <div className="row gapbelow">
          <div className="col-lg-12">
            <div
              className={
                " alert " +
                (status === 0 ? "alert-warning " : " ") +
                (status === -1 ? "alert-danger " : " ") +
                (status === 1 ? "alert-success " : " ")
              }
            >
              <p className="nmb">
                <span
                  className={
                    " oi mr5 " +
                    (status === 0 ? "oi-clock " : " ") +
                    (status === -1 ? "oi-x " : " ") +
                    (status === 1 ? "oi-check" : " ")
                  }
                />
                <span>{operationMessage}</span>
              </p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <form>
        <div className="row gapbelow">
          <div className="col-lg-12">
            <Select
              value={selectedSortField}
              onChange={value => this.handleSortFieldChange(value)}
              options={SortFields}
              placeholder="<Select Sort Field>"
            />
          </div>
        </div>
        <div className="row gapbelow">
          <div className="col-lg-12">
            <Select
              value={selectedSortDirection}
              onChange={value => this.handleSortDirectionChange(value)}
              options={SortDirections}
              placeholder="<Select Sort Direction>"
            />
          </div>
        </div>
        <div className="row gapbelow">
          <div className="col-lg-12">
            <div className="dropper">
              <input
                type="file"
                onChange={e => this.filesOnChange(e)}
                className="btn btn-info dropperInput"
              />
              <span>{fileNamePlaceholder}</span>
            </div>
          </div>
        </div>
        <div className="row gapbelow">
          <div className="col-lg-12">
            <button
              type="text"
              onClick={e => this.uploadForm(e)}
              className="btn btn-primary buttonstyle"
              disabled={status === 0}
            >
              <span>Upload To Server</span>
              <span className="oi oi-cloud-upload ml5 " />
            </button>
            <button
              type="text"
              onClick={e => this.ValidateFile(e)}
              className="btn btn-success buttonstyle mr5"
              disabled={status === 0}
            >
              <span>Validate File</span>
              <span className="oi oi-check ml5 " />
            </button>
          </div>
        </div>
        {messageComponent}
      </form>
    );
  }
}

const mapStateToProps = state => {
  const { hotelInfo } = state;

  return {
    ...hotelInfo
  };
};
//connect component to redux store
export default connect(
  mapStateToProps,
  actions
)(HotelInfoForm);

import React from "react";
import styled from "styled-components";

const BirthDayContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;
const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: ${props => (props.invalid ? "#b22222 solid 2px" : "none")};
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  width: ${props => (props.width ? props.width : "auto")};
`;
const DropDown = styled.select`
  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }
  height: 35px;

  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
`;

export class DateSelector extends React.Component {

    constructor(props){
        super(props);
        this.day = null;
        this.year = null;
        this.month = "01";
        this.state = {
            year: null,
            yearValid: true,
            day: null,
            dayValid : true,
            month: this.props.month ? this.props.month: "01",
            maxDays: 31
        }
    }
    validateDay(value) {
        const no = Number(value);
        return !isNaN(no) && 1 <= no && no <= this.state.maxDays;
    }

    validateYear(value) {
        const no = Number(value);
        return !isNaN(no) && 1900 <= no && no <= Number(new Date().getFullYear());

    }

    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({[key]: value});
        switch (key) {
            case "day":
                this.day = value;
                break;
            case "month":
                this.month = value;
                break
            case "year":
                this.year = value;
                break;
        }
    }
    parentCallback(){
        this.setState({});
        if (this.year && this.day) {
            this.props.onValidChange(Date.parse(this.year + "-" + this.month + "-" + this.day))
        }
        else this.props.onInvalidChange()
    }
    handleMonthChange(month) {
        let days;
        switch (month) {
            case "01":
                days = 31;
                break;
            case "02":
                days = 29;
                break;
            case "03":
                days = 31;
                break;
            case "04":
                days = 30;
                break;
            case "05":
                days = 31;
                break;
            case "06":
                days = 30;
                break;
            case "07":
                days = 31;
                break;
            case "08":
                days = 31;
                break;
            case "09":
                days = 30;
                break;
            case "10":
                days = 31;
                break;
            case "11":
                days = 30;
                break;
            case "12":
                days = 31;
                break;
        }
        this.setState({
            "maxDays": days,
            "month": month
        })
    }
    render() {
        return(
            <BirthDayContainer>
                <InputField
                    placeholder={this.props.day ? this.props.day: "Day"}
                    width="10%"
                    invalid = {!this.state.dayValid}
                    onChange={e => {
                        if (this.validateDay(e.target.value))
                        {
                            this.handleInputChange("day", e.target.value);
                            this.setState({"dayValid":true});
                            this.parentCallback()
                        }else {
                            this.setState({"dayValid": false});
                            this.handleInputChange("day", null);
                            this.parentCallback();
                        }
                    }}

                />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <DropDown
                    value = {this.month}
                    onChange={e => {
                    this.handleInputChange("month", e.target.value);
                    this.handleMonthChange(e.target.value)
                }}>
                    <option value="01">Jan.</option>
                    <option value="02">Feb.</option>
                    <option value="03">Mar.</option>
                    <option value="04">Apr.</option>
                    <option value="05">May.</option>
                    <option value="06">Jun.</option>
                    <option value="07">Jul.</option>
                    <option value="08">Aug.</option>
                    <option value="09">Sept.</option>
                    <option value="10">Oct.</option>
                    <option value="11">Nov.</option>
                    <option value="12">Dez.</option>
                </DropDown>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <InputField
                    placeholder={this.props.year ? this.props.year: "Year"}
                    width="15%"
                    invalid={!this.state.yearValid}
                    onChange={e => {
                        if (this.validateYear(e.target.value))
                        {
                            this.handleInputChange("year", e.target.value);
                            this.setState({"yearValid":true});
                            this.parentCallback()
                        } else {
                            this.setState({"yearValid": false});
                            this.handleInputChange("year", null);
                            this.parentCallback();
                        }
                    }}
                />
            </BirthDayContainer>
        )
    }
}

import React from "react";
import { shallow } from "enzyme";
import UserTable from "./UserTable";

function FakeEvent() {
  this.preventDefault = function () { 
    "do nothing"
  };
  this.target = {
    value: "nothing"
  }
}

const props = {
  data: ["Susan", "Mashu", "Kinga", "Steph"]
}
const props2 = {
  data: ["Susan", "Mashu", "Kinga", "Steph", "Kyle", "Bryan"]
}

describe('testing UserTable component', () => {
  let wrapper;
  beforeEach(() => { wrapper = shallow(<UserTable />); });

  it("renders without crashing", () => {
    shallow(<UserTable />);
  });
  
  it("fills this.state.users with data", () => {
    const instance = wrapper.instance();
    instance.paginateUsers(props);
    expect(wrapper.state('users')[1]).toHaveLength(4);
  });

  it("fills this.state.users with paginated data", () => {
    const instance = wrapper.instance();
    instance.paginateUsers(props2);
    expect(wrapper.state('users')[2]).toHaveLength(1);
  });

  it("calls handleChange with user input", () => {
    const spy = jest.spyOn(UserTable.prototype, 'handleChange');
    wrapper = shallow(<UserTable />)
    wrapper.find('input.search-input').simulate('change', new FakeEvent());
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it("increments this.state.currentPage when handlePageChange is passed an integer", () => {
    expect(wrapper.state('currentPage')).toEqual(1);
    wrapper.state('users')[2] = []
    const instance = wrapper.instance();
    instance.handlePageChange(new FakeEvent(), 2);
    expect(wrapper.state('currentPage')).toEqual(2); 
  });


});



import React from 'react';
// import classnames from 'classnames';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import SettingsImagePlaceholder  from './settingsImagePlaceholder';
// import ListEditPlaceholder  from './listEditPlaceholder';

export default class PanelSettings extends React.Component {
constructor(props) {
super(props);
this.state = {
  settingsEditList: []
};

}

componentWillReceiveProps = (nextProps) => {
  this.setState({
    settingsEditList: [...this.state.settingsEditList, ...nextProps.settingsList]
  })
}

render() {  
  const editItem = this.state.settingsEditList.map((item, i) => {
    return (
        <span key={i}>{i}</span>
    )
})
    return (
        <div className="panel-settings">
            <h1>Mass Placeholder</h1>
            <Tabs>
              <TabList className="clearfix tab-list">
                <Tab className="tab-btn">Background</Tab>
                <Tab className="tab-btn">Text color</Tab>
              </TabList>
              <TabPanel>
              {
               editItem
              }
                <SettingsImagePlaceholder />
              </TabPanel>
              <TabPanel>
                <h2>Text color</h2>
              </TabPanel>
            </Tabs>
            
        </div>
    );
  }
}


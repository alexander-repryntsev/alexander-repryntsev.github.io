import React from 'react';
import classnames from 'classnames';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import SettingsImagePlaceholder  from './settingsImagePlaceholder';
import ListImagePlaceholder  from './listImagePlaceholder';

export default class PanelSettings extends React.Component {

  render() {  
    return (
        <div className="panel-settings">
            <h1>Mass Placeholder</h1>
            <Tabs>
              <TabList className="clearfix tab-list">
                <Tab className="tab-btn">Background</Tab>
                <Tab className="tab-btn">Text color</Tab>
              </TabList>
              <TabPanel>
                <SettingsImagePlaceholder />
              </TabPanel>
              <TabPanel>
                <h2>Text color</h2>
              </TabPanel>
            </Tabs>
            <ListImagePlaceholder />
        </div>
    );
  }
}


import React, {Component} from 'react'
import App from '../components/App'

export default class AppContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedTab: 'Generate Code',
            recording: [],
            components: []
        }

        this.onSelectTab = this.onSelectTab.bind(this)
        this.onRestart = this.onRestart.bind(this)
    }

    render() {
        return React.createElement(App, {
            ...this.props,
            ...this.state,
            onSelectTab: this.onSelectTab,
            onRestart: this.onRestart
        })
    }

    componentDidMount() {

        chrome.storage.sync.get(['recording', 'components'], ({recording, components}) => {
            this.setState({recording, components})
        })

    }

    onSelectTab(selectedTab) {
        this.setState({selectedTab})
    }

    onRestart() {
        chrome.browserAction.setIcon({ path: './images/icon-black.png' })
        chrome.runtime.reload()
        window.close()
    }
}

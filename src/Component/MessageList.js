import React from 'react'

import {ListView} from 'react-native'
import MessageCell from './MessageCell.js'

export default class MessageList extends React.Component {
    _userReachEnd = true;
    _userHasBeenInputed = false;
    MessageListView: Object;
    ds: Object;
    rows: Array;

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.rows = [{
            rl: 0,
            content: '测试消息1',
            avatar: 'http://img1.imgtn.bdimg.com/it/u=3580504744,3022551902&fm=214&gp=0.jpg'
        }, {
            rl: 0,
            content: '测试消息2',
            avatar: 'http://img1.imgtn.bdimg.com/it/u=3580504744,3022551902&fm=214&gp=0.jpg'
        }, {
            rl: 0,
            content: '测试消息3',
            avatar: 'http://img1.imgtn.bdimg.com/it/u=3580504744,3022551902&fm=214&gp=0.jpg'
        }, {
            rl: 0,
            content: '测试消息4',
            avatar: 'http://img1.imgtn.bdimg.com/it/u=3580504744,3022551902&fm=214&gp=0.jpg'
        }, {
            rl: 0,
            content: '测试消息5',
            avatar: 'http://img1.imgtn.bdimg.com/it/u=3580504744,3022551902&fm=214&gp=0.jpg'
        }, {
            rl: 0,
            content: '测试消息6',
            avatar: 'http://img1.imgtn.bdimg.com/it/u=3580504744,3022551902&fm=214&gp=0.jpg'
        }, {
            rl: 1,
            content: '测试消息7',
            avatar: 'http://img1.imgtn.bdimg.com/it/u=3580504744,3022551902&fm=214&gp=0.jpg'
        }, {
            rl: 0,
            content: '测试消息8',
            avatar: 'http://img1.imgtn.bdimg.com/it/u=3580504744,3022551902&fm=214&gp=0.jpg'
        }, {
            rl: 1,
            content: '测试消息9',
            avatar: 'http://img1.imgtn.bdimg.com/it/u=3580504744,3022551902&fm=214&gp=0.jpg'
        }, {
            rl: 0,
            content: '测试消息10',
            avatar: 'http://img1.imgtn.bdimg.com/it/u=3580504744,3022551902&fm=214&gp=0.jpg'
        }, {
            rl: 0,
            content: '测试消息10',
            avatar: 'http://img1.imgtn.bdimg.com/it/u=3580504744,3022551902&fm=214&gp=0.jpg'
        }, {
            rl: 0,
            content: '测试消息10',
            avatar: 'http://img1.imgtn.bdimg.com/it/u=3580504744,3022551902&fm=214&gp=0.jpg'
        }];
        this.state = {
            message: this.ds.cloneWithRows(this.rows)
        }
    }

    renderRow = (message) => {
        return <MessageCell message={message}/>
    };

    _scrollToBottom() {
        let scrollProperties = this.MessageListView.scrollProperties;
        // 如果组件没有挂载完全，则不进行内容偏移
        if (!scrollProperties.visibleLength) {
            return;
        }

        // 如果是刷新操作，则不进行滑动
        if (!this._userReachEnd) {
            return;
        }


        // 这里是一个大坑，在测试环境的时候，由于运行速度较慢，scrollProperties.contentLength 总能
        // 获取到正确的值，生产环境需要加个延时，用来保证 `renderRow` 执行完毕
        // 这里设置了 130ms 的延时
        setTimeout(() => {
            let offsetY = scrollProperties.contentLength - scrollProperties.visibleLength;
            this.MessageListView.scrollTo({
                y: offsetY > 0 ? offsetY : 0,
                animated: this._userHasBeenInputed
            });
        }, this._userHasBeenInputed ? 0 : 130);
    }

    pushMessage = (message) => {
        this.rows.push({
            rl: 0,
            content: message,
            avatar: ''
        });
        this.setState({message: this.ds.cloneWithRows(this.rows)})
    };

    render() {
        return <ListView
            dataSource={this.state.message}
            renderRow={this.renderRow}
            enableEmptySections={true}
            ref={(reference) => {
                this.MessageListView = reference;
            }}
            onLayout={
                (event) => {
                    this._scrollToBottom();
                }
            }
            onContentSizeChange={
                (event) => {
                    this._scrollToBottom();
                }
            }
        />
    }
}
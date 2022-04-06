import React from 'react'
import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {useNavigation, useTheme} from '@react-navigation/native'

import moment from 'moment'

import {AuthContext} from '../context/authContext'

import {ArrowDown, ArrowUp, MessageSquare} from './icons'
import {SafeAreaView} from "react-native-safe-area-context";
import axios from "../utils/fetcher";
import {WebView} from "react-native-webview";

const CommentListItem = ({index, body, author, created,wholeitem,postId,userId, deleteComment}) => {
    const {colors} = useTheme()
    const {authState} = React.useContext(AuthContext)
    const [score,setscore] = React.useState(wholeitem.score)


    let votes=wholeitem.votes
    let temp1=votes.find(v => v.user === userId)?.vote === 1
    const [isUpVoted,setisUpVoted] = React.useState(temp1)
    let temp2=votes.find(v => v.user === userId)?.vote === -1
    const [isDownVoted,setisDownVoted] = React.useState(temp2)
    console.log("rendering one comment ",body )
    let route = {"name": "PostDetail", "params": {"postId": 123}}
    let type = "text";
    let text = body;
    let comments = [];
    const navigation = useNavigation()



    let commentId=wholeitem.id



    // setisUpVoted(votes.find(v => v.user === userId)?.vote === 1)
    //
    //
    // setisDownVoted(votes.find(v => v.user === userId)?.vote === -1)

    let css=`<style>
        video {max-width: 98%;margin-left:auto;margin-right:auto;display: block;}
        img {max-width: 98%;vertical-align: middle;}
        table {width: 100% !important;}
        table td {width: inherit;}
        table span { font-size: 12px !important; }
        .x-todo li {list-style:none;}
        .x-todo-box {position: relative; left: -24px;}
        .x-todo-box input{position: absolute;}
        blockquote{border-left: 6px solid #ddd;padding: 5px 0 5px 10px;margin: 15px 0 15px 15px;}
        hr{display: block;height: 0; border: 0;border-top: 1px solid #ccc; margin: 15px 0; padding: 0;}
        pre{padding: 10px 5px 10px 10px;margin: 15px 0;display: block;line-height: 18px;background: #F0F0F0;border-
radius: 6px;font-size: 13px; font-family: 'monaco', 'Consolas', "Liberation Mono", Courier, monospace; word-break:
break-all; word-wrap: break-word;overflow-x: auto;}
        pre code {display: block;font-size: inherit;white-space: pre-wrap;color: inherit;}
    </style>
`;
    let html = `<html><head><meta name="viewport" content="user-scalable=1.0,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0">${css}</head><body>${text}</body></html>`;

    const upVote = async () => {
        console.log("upvoted, ",postId,commentId)
        // setIsLoaading(true)
        const {data} = await axios.get(`post/${postId}/${commentId}/upvote`)
        if (data){
            console.log("ddddd",data)
            let newscore=data.comments.find(c=>c.id===commentId).score
            setscore(newscore)
            setisUpVoted(1)
            setisDownVoted(0)
            // score=data.find()
            //update the vote
        }
    }

    const downVote = async () => {
        // setIsLoaading(true)
        const {data} = await axios.get(`post/${postId}/${commentId}/downvote`)
        if (data){
            console.log("ddddd",data)
            let newscore=data.comments.find(c=>c.id===commentId).score
            setscore(newscore)
            setisUpVoted(0)
            setisDownVoted(1)
            // score=data.find()
            //update the vote
        }
    }

    const unVote = async () => {
        // setIsLoaading(true)
        const {data} = await axios.get(`post/${postId}/${commentId}/unvote`)
        if (data){
            console.log("ddddd",data)
            let newscore=data.comments.find(c=>c.id===commentId).score
            setscore(newscore)
            setisUpVoted(0)
            setisDownVoted(0)
        }
    }

    return (

        <View
            as={SafeAreaView}
            style={[
                styles.container,
                {backgroundColor: colors.bgColor, borderColor: colors.postBorder}
            ]}
        >
            <View style={styles.headerContainer}>
                <View style={styles.headerLeft}>
                    <Text style={[styles.dateText, {color: colors.text}]}>{"#"}{index}{" "}</Text>
                    <Text
                        style={[styles.italicFont, {color: colors.blue}]}
                        onPress={() => navigation.navigate('User', {username: author.username})}
                    >
                        {author?.username}
                    </Text>
                    <Text
                        style={[styles.dateText, {color: colors.text}]}> ·{' '}{moment(created).fromNow()}{"  "}</Text>


                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity
                        onPress={() => (isUpVoted ? unVote() : upVote())}
                    >
                        <ArrowUp
                            width={22}
                            height={22}
                            strokeWidth={4}
                            color={isUpVoted ? colors.green : colors.icon}
                        />
                    </TouchableOpacity>
                    <Text style={[styles.score, {color: colors.text}]}>{score}</Text>

                    <View style={styles.centerAlign}>


                        <TouchableOpacity
                            onPress={() => (isDownVoted? unVote() : downVote())}
                        >
                            <ArrowDown
                                width={22}
                                height={22}
                                strokeWidth={4}
                                color={isDownVoted? colors.red : colors.icon}
                            />
                        </TouchableOpacity>
                    </View>
                    {/*<Text style={[styles.regularFont, {color: colors.text}]}>{"  "}{category} </Text>*/}

                    {/*{deleteButton && author?.id === authState.userInfo.id && (*/}
                    {/*    <TouchableOpacity style={styles.trash} activeOpacity={0.5} onPress={deletePost}>*/}
                    {/*        <Trash color={colors.red} width={20} height={20}/>*/}
                    {/*    </TouchableOpacity>*/}
                    {/*)}*/}
                </View>
            </View>

            {/*<Text*/}
            {/*    numberOfLines={route.name === 'PostDetail' ? 10000 : 10}*/}
            {/*    style={[*/}
            {/*        styles.regularFont,*/}
            {/*        {color: colors.text},*/}
            {/*        type === 'link' && route.name === 'PostDetail' && styles.link*/}
            {/*    ]}*/}
            {/*    onPress={() =>*/}
            {/*        route.name === 'PostDetail' && type === 'link'*/}
            {/*            ? Linking.openURL(url)*/}
            {/*            : navigation.navigate('PostDetail', {postId, category, comments})*/}
            {/*    }*/}
            {/*>*/}
            {/*    {type === 'link' ? url : text}*/}
            {/*</Text>*/}
            <View style={{height:200}}>
                <WebView
                    // useWebKit={true}
                    scrollEnabled={true}
                    // hideKeyboardAccessoryView={true}
                    // keyboardDisplayRequiresUserAction={false}
                    // originWhitelist={['*']}
                    // dataDetectorTypes={'none'}
                    // domStorageEnabled={false}
                    // bounces={false}
                    // javaScriptEnabled={true}
                    source={{html}}
                />
            </View>
            <View style={styles.bottomContainer}>

                <TouchableOpacity
                    style={styles.centerAlign}
                    activeOpacity={0.7}
                    // onPress={() => navigation.navigate('PostDetail', {postId, category, comments})}
                >
                    <MessageSquare
                        color={colors.icon}
                        style={styles.commentIcon}
                        width={20}
                        height={20}
                        strokeWidth={3}
                    />
                    <Text style={[styles.commentText, {color: colors.text}]}>{comments?.length}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('CommentReply',
                    // {postId, category, comments}
                    {"category":"hihhihihi","postId":postId,"commentId":commentId}
                )}>
                    <Text style={[styles.italicFont, {color: colors.text}]}>{"replys"} </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingHorizontal: 15,
        paddingVertical: 7,
        marginBottom: 7,
        elevation: 1,
        borderWidth: 1
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 7,
        fontSize: 13
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerRight: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginTop: 12
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12
    },
    centerAlign: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 17,
        fontFamily: 'OpenSans-Bold'
    },
    score: {
        marginHorizontal: 5,
        fontFamily: 'OpenSans-SemiBold'
    },
    commentIcon: {
        marginBottom: -3
    },
    commentText: {
        marginLeft: 3,
        fontFamily: 'OpenSans-SemiBold'
    },
    regularFont: {
        fontFamily: 'OpenSans-Regular'
    },
    italicFont: {
        fontFamily: 'OpenSans-Italic'
    },
    dateText: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 12
    },
    link: {
        color: '#0064bd',
        fontWeight: 'bold'
    }
})

export default CommentListItem

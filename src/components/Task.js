import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableWithoutFeedbackBase, TouchableOpacity } from 'react-native'
import CommonStyles from '../commonStyles'
import Icon from 'react-native-vector-icons/FontAwesome'

import Swipeable from 'react-native-gesture-handler/Swipeable'
import moment from 'moment'
import 'moment/locale/pt-br'

export default props => {

    const doneOrNot = props.doneAt != null ?
        { textDecorationLine: 'line-through' } : {}

    const date = props.doneAt ? props.doneAt : props.estimateAt
    const formattedDate = moment(date).locale('pt-br').format('ddd, D [de] MMMM')

    const getRightContent = () => {
        return (
            <TouchableOpacity style={styles.right} onPress={() => props.onDelete && props.onDelete(props.id)}>
                <Icon name="trash" size={30} color="#FFF" />
            </TouchableOpacity>
        )
    }

    const getLeftContent = () => {
        return (
            <View style={styles.left}>
                <Icon name="trash" size={20} color="#FFF" style={styles.excludeIcon} />
                <Text style={styles.excludeText}>Excluir</Text>
            </View>
        )
    }

    return (
        <Swipeable renderRightActions={getRightContent} renderLeftActions={getLeftContent}
            onSwipeableLeftOpen={() => props.onDelete && props.onDelete(props.id)} >
            <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => props.onToggleTask(props.id)}>
                <View style={styles.checkContainer}>
                    {getCheckView(props.doneAt)}
                </View>
            </TouchableWithoutFeedback>
            <View>
                <Text style={[styles.desc, doneOrNot]}>{props.desc}</Text>
                <Text style={styles.date}>{formattedDate + ""}</Text>
            </View>
        </View>
        </Swipeable>
        
    )
}

function getCheckView(doneAt) {
    if (doneAt != null) {
        return (
            <View style={styles.done}>
                <Icon name='check' size={20} color='#FFF'></Icon>
            </View>
        )
    } else {
        return (
            <View style={styles.pedding}></View>
        )
    }
    
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#FFF',
    },
    checkContainer: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pedding: {
        width: 25,
        height: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555'
    },
    done: {
        width: 25,
        height: 25,
        borderRadius: 13,
        backgroundColor: '#4D7031',
        alignItems: 'center',
        justifyContent: 'center',
    },
    desc: {
        fontFamily: CommonStyles.fontfamily,
        color: CommonStyles.color.mainText,
        fontSize: 15,
    },
    date: {
        fontFamily: CommonStyles.fontfamily,
        color: CommonStyles.color.subText,
        fontSize: 12,
    },
    right: {
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
    },
    left: {
        flex: 1,
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
    },
    excludeText: {
        fontFamily: CommonStyles.fontfamily,
        color: '#FFF',
        fontSize: 20,
        margin: 10,
    },
    excludeIcon: {
        marginLeft: 10,
    }
})
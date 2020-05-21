import React, { Component } from 'react'
import { View, Text, ImageBackground, StyleSheet, FlatList, TouchableOpacity, Platform, Alert } from 'react-native'

import Task from '../components/Task'
import CommonStyles from '../commonStyles'
import axios from 'axios'
import todayImage from '../../assets/imgs/today.jpg'
import AddTask from './AddTask'

import { server, showError } from '../common'
import {AsyncStorage} from 'react-native';
import moment from 'moment'
import 'moment/locale/pt-br'

import Icon from 'react-native-vector-icons/FontAwesome'

const initialState = {
    showDoneTasks: true,
    showAddTask: false,
    visibleeTask: [],
    tasks: [],
}

export default class TaskList extends Component {
    state = {
        ...initialState
    }
    async componentDidMount() {
        const stateString = await AsyncStorage.getItem('tasksState')
        const savedState = JSON.parse(stateString) || initialState
        this.setState({
            showDoneTasks: savedState.showDoneTasks
        }, this.filterTasks)

        this.loadTasks()
    }

    loadTasks = async() => {
        try {
            const maxDate = moment().format('YYYY-MM-DD 23:59:59')
            const res = await axios.get(`${server}/tasks?date=${maxDate}`)
            this.setState({ tasks: res.data }, this.filterTasks)
        } catch (e) {
            showError(e)
        }
    }

    toggleFilter = () => {
        this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
    }

    filterTasks = () => {
        let visibleeTask = null
        if (this.state.showDoneTasks) {
            visibleeTask = [...this.state.tasks]
        } else {
            const pedding = task => task.doneAt === null 
            visibleeTask = this.state.tasks.filter(pedding)
        }

        this.setState({ visibleeTask })
        AsyncStorage.setItem('tasksState', JSON.stringify({
            showDoneTasks: this.state.showAddTask
        }))
    }

    toggleTask = async taskId => {
        try {
            await axios.put(`${server}/${taskId}/toggle`)
            this.loadTasks()
        } catch (e) {
            showError(e)
        }
    }

    addTask = async newTask => {
        if(!newTask.desc || !newTask.desc.trim()){
            Alert.alert('Dado não cadastrado', 'Descrição não informada')
            return
        }

        try {
            await axios.post(`${server}/tasks`, {
                desc: newTask.desc,
                estimateAt: newTask.date
            })
        } catch (e) {
            showError(e)
        }

        this.setState({showAddTask: false }, this.loadTasks)
    }

    deleteTask = async taskId => {
        try {
            await axios.delete(`${server}/tasks/${taskId}`)
            this.loadTasks()
        } catch(e) {
            showError(e)
        }
    }

    render() {
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return (
            <View style={styles.container}>
                <AddTask isVisible={this.state.showAddTask} onCancel={() => this.setState({ showAddTask: false })} 
                    onSave={this.addTask} />
                <ImageBackground source={todayImage} style={styles.background}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={this.toggleFilter}>
                            <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                                size={20} color={CommonStyles.color.secondary} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskList}>
                    <FlatList data={this.state.visibleeTask}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({item}) => <Task {...item} onToggleTask={this.toggleTask}
                        onDelete={this.deleteTask} />} />
                </View>
                <TouchableOpacity style={styles.addButton} onPress={() => this.setState({ showAddTask: true })}
                    activeOpacity={0.7} >
                    <Icon name="plus" size={20} color={CommonStyles.color.secondary} />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 3,
    },
    taskList: {
        flex: 7,
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    title: {
        fontFamily: CommonStyles.fontfamily,
        color: CommonStyles.color.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 20,
    },
    subtitle: {
        fontFamily: CommonStyles.fontfamily,
        color: CommonStyles.color.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30,
    },
    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'flex-end',
        marginTop: Platform.OS === 'ios' ? 40 : 40,
    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: CommonStyles.color.today,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
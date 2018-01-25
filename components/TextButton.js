import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { gray, white } from '../utils/colors'

export default function TextButton({ children, onPress, style = {} }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={[styles.subBtnText, style]}>{children}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    subBtnText: {
        textAlign: 'center',
        alignSelf:'center',
        fontSize: 25,
        padding:16,
        color: white
    }
})
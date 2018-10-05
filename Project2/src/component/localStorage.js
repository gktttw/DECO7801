// A global variable of storage

'use native'
import Storage from 'react-native-storage'
import { AsyncStorage } from 'react-native'

var storage = new Storage({
    storageBackend: AsyncStorage
})

export default global.storage = storage
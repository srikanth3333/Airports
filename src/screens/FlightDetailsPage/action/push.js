import { createAction } from 'redux-actions'
import { isEmpty } from 'lodash'

import { push } from '../actiontypes'

export const getPush = createAction(push.GET_PUSH)
export const getPushSucceeded = createAction(push.GET_PUSH_SUCCEEDED)
export const getPushFailed = createAction(push.GET_PUSH_FAILED)
export const registerDevice = createAction(push.REGISTER_DEVICE)
export const registerDeviceSucceeded = createAction(push.REGISTER_DEVICE_SUCCEEDED)
export const registerDeviceFailed = createAction(push.REGISTER_DEVICE_FAILED)
export const registerUserDevice = createAction(push.REGISTER_USER_DEVICE)
export const registerUserDeviceSucceeded = createAction(push.REGISTER_USER_DEVICE_SUCCEEDED)
export const registerUserDeviceFailed = createAction(push.REGISTER_USER_DEVICE_FAILED)
export const getTopics = createAction(push.GET_TOPICS)
export const getTopicsSucceeded = createAction(push.GET_TOPICS_SUCCEEDED)
export const getTopicsFailed = createAction(push.GET_TOPICS_FAILED)
export const subscribeToTopic = createAction(push.SUBSCRIBE_TO_TOPIC)
export const subscribeToTopicSucceeded = createAction(push.SUBSCRIBE_TO_TOPIC_SUCCEEDED)
export const subscribeToTopicFailed = createAction(push.SUBSCRIBE_TO_TOPIC_FAILED)
export const unSubscribeFromTopic = createAction(push.UNSUBSCRIBE_FROM_TOPIC)
export const unsubscribeToTopicSucceeded = createAction(push.UNSUBSCRIBE_TO_TOPIC_SUCCEEDED)
export const unsubscribeToTopicFailed = createAction(push.UNSUBSCRIBE_TO_TOPIC_FAILED)
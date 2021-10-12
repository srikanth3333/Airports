import { createSelector } from 'reselect'
import { get, isEmpty, find } from 'lodash'

const getPlans = state => state.plans.list

// pass codeshareId to selector via setStateToProps
// e.g.
// const setStateToProps = state => ({
//  isPlanExisted: isPlanExisted(state, 'CodeshareId')
//})
const getCodeshareId = (state, codeshareId) => codeshareId

const isPlanExisted = createSelector([
    getPlans, getCodeshareId
  ],
  (plans, codeshareId) => {
    return !isEmpty(find(plans, ({ flightInfo}) => get(flightInfo, 'codeshareFlight.afsKey') === codeshareId))
  }
)

export default isPlanExisted
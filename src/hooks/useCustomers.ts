import { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '../rematch'
import { Customer } from '../rematch/models/customer'

const useCustomers = (): [Customer[], Customer[]] => {
  const data = useSelector((store: RootState) => store.customer.data)
  const keyword = useSelector((store: RootState) => store.customer.keyword.trim())
  const dispatch = useDispatch<Dispatch>()
  useEffect(() => {
    if (!data.length) {
      dispatch.customer.loadCustomers()
    }
  }, [data.length, dispatch.customer])
  const customers = useMemo(() => data.length ? data.filter(({ name, leader, leaderPhone, address, addressDetail, remark }) => name.includes(keyword) || leader.includes(keyword) || leaderPhone.includes(keyword) || address.includes(keyword) || addressDetail.includes(keyword) || remark.includes(keyword)) : data, [keyword, data])
  return [data, customers]
}

export default useCustomers

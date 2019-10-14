import React, { useEffect, useState } from 'react'
import { Segment, Loader, Tab } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import useGetToken from '../utils/useGetToken'

import AllegianceTab from './AllegianceTab'
import { Link } from 'react-router-dom'

const AddAllegiance = props => {
  const [data, setData] = useState()

  //Fetches logged in user's info from redux store.
  const loggedInAllegiances = useSelector(
    state => state.userReducer.loggedInAllegiances
  )
  const dispatch = useDispatch()

  //Fetches Auth0 token for axios call
  const [token] = useGetToken()

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const allegiances = await axiosWithAuth([token]).get(`/allegiances`)
          //Sorts allegiances into arrays by sport.
          const sortBySport = allegiances.data.allegiances.reduce(
            (accumulator, object) => {
              const key = object['sport']
              if (!accumulator[key]) accumulator[key] = []
              accumulator[key].push(object)
              return accumulator
            },
            {}
          )
          setData(sortBySport)
        } catch {
          console.log('Something went wrong')
        }
      }
    }

    fetchData()
  }, [token, dispatch])

  const panes = [
    {
      menuItem: { icon: 'football ball', key: 'NFL' },
      render: () => <AllegianceTab allegiances={data.NFL} />,
    },
    {
      menuItem: { icon: 'baseball ball', key: 'MLB' },
      render: () => <AllegianceTab allegiances={data.MLB} />,
    },
    {
      menuItem: { icon: 'basketball ball', key: 'NBA' },
      render: () => <AllegianceTab allegiances={data.NBA} />,
    },
    {
      menuItem: { icon: 'hockey puck', key: 'NHL' },
      render: () => <AllegianceTab allegiances={data.NHL} />,
    },
    {
      menuItem: 'Other',
      render: () => <AllegianceTab allegiances={data.Other} />,
    },
    {
      menuItem: 'Mine',
      render: () => <AllegianceTab allegiances={loggedInAllegiances} />,
    },
  ]

  if (!data)
    return (
      <Loader active size='large'>
        Loading
      </Loader>
    )

  return (
    <Segment
      raised
      color='blue'
      style={{ width: '90%', margin: 'auto', marginBottom: '15%' }}
    >
      <Tab menu={{ borderless: true, pointing: true }} panes={panes} />
      <Link to='/makeallegiance'>Can't find your Allegiance? Click here!</Link>
    </Segment>
  )
}

export default AddAllegiance

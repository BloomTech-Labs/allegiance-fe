import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import { Search } from 'semantic-ui-react'
import axios from 'components/utils/axiosWithoutAuth'
import { withRouter } from 'react-router-dom'

const NavSearch = props => {
  const [isLoading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [value, setValue] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const groups = await axios.post('/groups/search', {
        column: 'group_name',
        row: value,
      })
      setLoading(false)
      setResults(
        groups.data.groupByFilter
          .map(group => {
            return {
              ...group,
              title: group.group_name,
            }
          })
          .slice(0, 10)
      )
    }
    if (value.length < 1) {
      setLoading(false)
      setResults([])
      setValue('')
    } else {
      fetchData()
    }
  }, [value])

  const handleResultSelect = (evt, { result }) => {
    setValue('')
    if (props.resultSelectCallback) {
      props.resultSelectCallback()
    }
    props.history.push(`/group/${result.id}`)
  }

  const handleSearchChange = (evt, { value }) => {
    setLoading(true)
    setValue(value)
  }

  return (
    <StyledSearch
      fluid
      input={{ fluid: true, autoFocus: true }}
      loading={isLoading}
      onResultSelect={handleResultSelect}
      onSearchChange={_.debounce(handleSearchChange, 500, {
        leading: true,
      })}
      results={results}
      value={value}
      noResultsMessage='No groups found.'
      placeholder='Search for a group...'
    />
  )
}

const StyledSearch = styled(Search)`
  width: 100% !important;
  .prompt {
    border-radius: 5px !important;
  }
`

export default withRouter(NavSearch)

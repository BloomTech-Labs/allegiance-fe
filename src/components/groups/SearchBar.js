import React, { useState, useEffect, useRef } from 'react'
import axios from 'components/utils/axiosWithoutAuth'
// import useGetToken from '../utils/useGetToken'
import useForm from '../utils/useForm'
import useDebounce from '../utils/useDebounce'
import useOnClickOutside from 'use-onclickoutside'

import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import styled from 'styled-components'

import SearchResults from './SearchResults'

const SearchBar = props => {
  // useStates for results and is searching status
  const [results, setResults] = useState([])
  // useForm custom hook and set timeout custom hook
  const { values, setValues, handleChange } = useForm(fillSearch)
  const debouncedSearchTerm = useDebounce(values.group_name, 1000)
  // useStates for handling up and down arrow key selections
  const [activeSuggestion, setSuggestion] = useState(0)
  // added useRef
  const node = useRef()
  // callback function to handle submit
  function fillSearch(e, group) {
    if (group) {
      setValues({ group_name: group.group_name })
    }
  }
  // Material UI
  const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      '&:hover': {
        background: 'white',
      },
    },
    dense: {},
    menu: {},
  }))

  const classes = useStyles()

  const onKeyDown = e => {
    // Checks if inside search bar
    if (e.keyCode === 13) {
      e.preventDefault()
      // Check that results from SearchResults has something to fill
      if (results.length > 0) {
        setSuggestion(0)
      } else {
        setValues(['NO GROUPS'])
      }
    }
  }

  //useEffect to grab groups that are searched for from the backend (column and row filters for only group results that are being searched)
  useEffect(() => {
    const fetchData = async () => {
      // if (token) {
      const groups = await axios.post('/groups/search', {
        column: 'group_name',
        row: values.group_name,
      })
      return groups
    }
    // If empty string in search immediately set results array to blank
    if (values.group_name === '') setShowResults(false)
    // Make sure we have a value (user has entered something in input)
    else if (debouncedSearchTerm) {
      // Fire off our API call
      fetchData().then(res => {
        // Set results state
        setResults(res.data.groupByFilter)
        setShowResults(true)
        setLoading(false)
      })
    }
  }, [values, debouncedSearchTerm])

  const [showResults, setShowResults] = useState(false)
  const [loading, setLoading] = useState(true)

  useOnClickOutside(node, e => {
    setShowResults(false)
  })
  return (
    <SearchFormWrapper ref={node}>
      {/* form to handle group search text from user */}
      <SearchForm autoComplete='off'>
        <TextField
          value={values.group_name || ''}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          id='outlined-with-placeholder'
          label='Search Groups'
          placeholder='Search Groups'
          className={classes.textField}
          variant='outlined'
          name='group_name'
        />
      </SearchForm>
      {/* search results component handles display of results */}
      {showResults && (
        <SearchResults
          loading={loading}
          results={results}
          fillSearch={fillSearch}
          activeSuggestion={activeSuggestion}
        />
      )}
    </SearchFormWrapper>
  )
}

const SearchFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 80vw;
  // position: relative;
`

const SearchForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 50vw;
  @media (max-width: 800px) {
    width: 92.4vw;
  }
`

export default SearchBar

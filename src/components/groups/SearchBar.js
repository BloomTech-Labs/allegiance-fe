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
  // token for accessing authentication required backend routes
  // const [token] = useGetToken()
  // useForm custom hook and set timeout custom hook
  const { values, setValues, handleChange, handleSubmit } = useForm(fillSearch)
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
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    dense: {
      marginTop: theme.spacing(2),
    },
    menu: {
      width: 200,
    },
  }))

  const classes = useStyles()

  const onKeyDown = e => {
    // Checks if inside search bar
    // if (node.current.contains(e.target)) {
    if (e.keyCode === 13) {
      e.preventDefault()
      // Check that results from SearchResults has something to fill
      console.log('RESULTS', results)
      if (results.length > 0) {
        setSuggestion(0)
        // setValues(results[activeSuggestion])
        // props.history.push(`/group/${results[0].id}`)
      } else {
        console.log('ELSE')
        setValues(['NO GROUPS'])
      }
    }
    //User pressed the up arrow
    // if (e.keyCode === 38) {
    //   if (activeSuggestion === 0) {
    //     return
    //   }
    //   setSuggestion(activeSuggestion - 1)
    // }
    // // User pressed the down arrow
    // else if (e.keyCode === 40) {
    //   if (activeSuggestion + 1 === results.length) {
    //     return
    //   }
    //   setSuggestion(activeSuggestion + 1)
    // }
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
  const handleClick = e => {
    // console.log('VALS', values)
    // if (values.length === 0) {
    //   return
    // } else {
    //   setShowResults(true)
    // }
  }
  // const handleSearchChange = (e) => {
  //   handleChange(e)
  // }
  useOnClickOutside(node, e => {
    console.log(e.target)
    setShowResults(false)
  })
  return (
    <SearchFormWrapper ref={node}>
      {/* form to handle group search text from user */}
      <SearchForm>
        <TextField
          onClick={handleClick}
          value={values.group_name || ''}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          id='outlined-with-placeholder'
          label='Search Groups'
          placeholder='Search Groups'
          className={classes.textField}
          margin='normal'
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
  position: relative;
`

const SearchForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 50vw;
  @media (max-width: 800px) {
    width: 92.4vw;
    height: 100px;
  }
  &:hover {
    background: #add8e6;
  }
`

export default SearchBar

import mixpanel from 'mixpanel-browser'

mixpanel.init('7c1d028ede1f4d4c03b1e0683f8a097c')

//let env_check = process.env.NODE_ENV === 'development';

let actions = {
  identify: id => {
    mixpanel.identify(id)
  },
  alias: id => {
    mixpanel.alias(id)
  },
  track: (name, props) => {
    mixpanel.track(name, props)
  },
  people: {
    set: props => {
      mixpanel.people.set(props)
    },
  },
  login: (user, message) => {
    actions.identify(user.id)
    actions.track(message)
    actions.people.set({
      $email: user.email,
      $first_name: user.first_name,
      $last_name: user.last_name,
    })
  },
  activity: (id, message) => {
    actions.identify(id)
    actions.track(message)
  },
}

export let Mixpanel = actions

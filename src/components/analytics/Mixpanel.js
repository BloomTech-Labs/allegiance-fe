import mixpanel from 'mixpanel-browser'

mixpanel.init('7c1d028ede1f4d4c03b1e0683f8a097c', { api_host: "https://api.mixpanel.com" })

const env_check = process.env.NODE_ENV === 'production';

let actions = {
  identify: id => {
    if (env_check) {
      mixpanel.identify(id)
    }
  },
  alias: id => {
    if (env_check) {
      mixpanel.alias(id)
    }
  },
  track: (name, props) => {
    if (env_check) {
      mixpanel.track(name, props)
    }
  },
  people: {
    set: props => {
      if (env_check) {
        mixpanel.people.set(props)
      }
    },
  },
  login: (user, message) => {
    if (env_check) {
      actions.identify(user.id)
      actions.track(message)
      actions.people.set({
        $email: user.email,
        $first_name: user.first_name,
        $last_name: user.last_name,
      })
    }
  },
  activity: (id, message) => {
    if (env_check) {
      actions.identify(id)
      actions.track(message)
    }
  },
}

export let Mixpanel = actions

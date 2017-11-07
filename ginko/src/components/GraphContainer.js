import React, { Component } from 'react'

import _ from 'lodash'
import ginko from 'ginko-api-service'

class GraphContainer extends Component {
  constructor() {
    super()
    this.state = {
      nodes: [],
      edges: [],
      shouldUpdateRelations: true
    }
  }

  state: {
    nodes: [any],
    edges: [any],
    shouldUpdateRelations: bool
  };

  componentWillMount() {
    // get our Person test fixtures
    ginko.getPerson({ last_name: 'fixture', limit: 50 }).then((people) => {
      let peopleIds = people.map(x => x.id)
      let params = {
        where: {
          id: peopleIds
        },
        limit: 50
      }
      // then get a picture for each person
      ginko.getPicture(params).then((pics) => {
        for (let i = 0; i < people.length; i++) {
          people[i].thumbnail = pics[i].image_string
        }
        // finally add the nodes to state
        this.setState({nodes: people})
      })
    })
  }

  componentDidUpdate() {
    // If relations haven't been loaded yet
    if (this.state.shouldUpdateRelations) {
      // load relations for nuclear families
      ginko.getRelation({ classification: 'fixture_nuclear', limit: 250 })
        .then((nuclear_relations) => {
          let additions = _.map(nuclear_relations, (e) => {
            return {
              source: _.findIndex(this.state.nodes,
                (_person) => e.related_from === _person.id),
              target: _.findIndex(this.state.nodes,
                (_person) => e.related_to === _person.id)
            }
          })
          // then load relations for marriages
          ginko.getRelation({ classification: 'fixture_marriage', limit: 50 })
            .then((marriage_relations) => {
              let moreAdditions = _.map(marriage_relations, (e) => {
                return {
                  source: _.findIndex(this.state.nodes,
                    (_person) => e.related_from === _person.id),
                  target: _.findIndex(this.state.nodes,
                    (_person) => e.related_to === _person.id)
                }
              })

              // finally store the relations in state
              let relations = _.concat(additions, moreAdditions)
              this.setState({ edges: relations, shouldUpdateRelations: false })
            })
        })
    }
  }

  render() {
    return (
      <div>
        {'GraphContainer'}
      </div>
    )
  }
}

export default GraphContainer

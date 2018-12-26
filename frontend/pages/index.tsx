import * as React from 'react'
import axios from 'axios'
import R from 'ramda'

interface State {
    form: {
        [s: string]: string
    }
}

export default class extends React.Component {
    request(data: {key: string, value: string}) {
        axios.post('http://localhost:3001', {
            [data.key]: data.value
        })
    }

    submit = () => {
        
    }

    inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        const key = e.currentTarget.name
    }

    render() {
        return (
            <div>
                oi
                <form action="javascript:void(0)" onSubmit={this.submit}>
                    <input type="text" name="key"/>
                    <input type="text" name="value"/>
                    <button type="submit">Enviar</button>
                </form>
            </div>
        )
    }
}
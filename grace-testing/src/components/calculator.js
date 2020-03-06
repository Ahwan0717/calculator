import React from 'react'
import { add } from './calculations'


const Calculator = () => {
    const [numOne, setNumOne] = React.useState(0);
    const [numTwo, setNumTwo] = React.useState(0);
    const [result, setResult] = React.useState(0);

    const handleSubmit = evt => {
        evt.preventDefault();
        setResult(add(numOne, numTwo))
    }

    return (
        <div id="Calculator">
            <div>Calculator</div>
            <form onSubmit={evt => handleSubmit(evt)}>
                Add:
                <input type="text"
                    id="numOne"
                    defaultValue={numOne}
                    onChange={evt => setNumOne(evt.target.value)} />
                <input type="text"
                    id="numTwo"
                    defaultValue={numTwo}
                    onChange={evt => setNumTwo(evt.target.value)} />
                <input type="submit"
                    value="="
                    id="calcBtn" />
            </form>
            <div className="result">{result}</div>
        </div>
    )
}

export default Calculator
import { useState } from "react";

function Counter() {
    const [count, setCount] = useState(0);
    const [name, setName] = useState<string>('');

    return (
        <div>
            <h1>{count}</h1>

            <button onClick={() => setCount((prev) => prev + 1)}> + </button>
            <button onClick={() => setCount((prev) => prev - 1)}> - </button>
            <button onClick={() => setCount(0)}> Reset </button>
            <br /><br /><br /><br />

            <input type="text" value={name} onChange={(event) => setName(event?.target.value)} />
            <p>You entered: {name}</p>
        </div>
    )
}
export default Counter;
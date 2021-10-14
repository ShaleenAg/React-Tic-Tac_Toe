import {expect , test} from '@jest/globals'

import {create} from 'react-test-renderer'
import Board from "../Components/Board"

describe("snapshot testing",()=>{
    const snap = create(<Board />).toJSON();
    test("Match initial Render", ()=>{
    expect(snap).toMatchSnapshot()
    })
})
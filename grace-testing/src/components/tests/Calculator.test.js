import React from 'react'
import { render, prettyDOM, getRoles, fireEvent } from '@testing-library/react'
import { add } from '../calculations'
import Calculator from '../calculator'

//see jest documentation

describe('The calculator component', () => {
    describe('Business logic', () => { //separation of concerns
        it('the "add" function adds two numbers together', () => { //one test spec
            expect(add(1, 2)).toBe(3); //expect is assertion
            expect(add(-1, 3)).toBe(2); //to be is a matcher
        })
    })
    describe('Visual component', () => {
        it('renders', () => {
            const { container, debug } = render(<Calculator />)
            // console.log(debug())
            // console.log(prettyDOM(container, firstChild))
            expect(container.firstChild).toBeTruthy()
        });
        it('has a header with the text "Calculator', () => {
            const { getByText } = render(<Calculator />)
            expect(getByText((content, element) => {
                return element.tagName.toLowerCase() === 'div' &&
                    content == 'Calculator'
            })).toBeTruthy()

        })
        it('has two forms to input the numbers used in the calculator',
            () => {
                const { getAllByRole } = render(<Calculator />);
                const forms = getAllByRole('textbox');
                // console.log(getRoles(forms))
                expect(forms).toHaveLength(2);
            })
        it('which have the ids of "numOne" and "numTwo" and are set to 0 as default values', () => {
            const { getByDisplayValue } = render(<Calculator />);
            // console.log(typeof value)
            expect(getByDisplayValue((value, element) => {
                return element.id === 'numOne' && Number(value) === 0
            })).toBeTruthy();
            expect(getByDisplayValue((value, element) => {
                return element.id === 'numTwo' && Number(value) === 0
            })).toBeTruthy();
        });
        it('renders a calculate button represented by "="', () => {
            const { getByText } = render(<Calculator />);
            expect(getByText((content, element) => {
                return element.id === 'calcBtn' && content === '=';
            })).toBeTruthy();
        });

        it('can add two numbers togetehr by filling in the number forms and hitting the calculate button', () => {
            const { getAllByRole, getByText } = render(<Calculator />);
            const expectations = {
                numOne: 1,
                numTwo: 2
            }
            const forms = getAllByRole('textbox')
            forms.forEach(form => {
                fireEvent.change(form, { target: { value: expectations[form.id] } })
            });
            fireEvent.click(getByText('='));
            expect(getByText((content, element) => {
                return element.className === 'result' && Number(content) === 3;
            })).toBeTruthy()
        })

    })
})

// we are using testing library and jest
import React from "react";
import {create} from "react-test-renderer"
import ProfileStatus from "./ProfileStatus";

describe('ProfileStatus', () => {
        test("status from props should be in the state", () => {
            const component = create(<ProfileStatus profileStatus='Test-Status'/>);
            const instance = component.getInstance()
            expect(instance.state.status).toBe('Test-Status')
        })

        test("after creation <span> should be displayed", () => {
            const component = create(<ProfileStatus profileStatus='Test-Status'/>);
            const root = component.root
            let span = root.findByType('span')
            expect(span.type).toBe('span')
        })

        test("after creation <span> should be displayed with correct status", () => {
            const component = create(<ProfileStatus profileStatus='Test-Status'/>);
            const root = component.root
            let span = root.findByType('span')
            expect(span.children[1]).toBe('Test-Status')
        })

        test("after creation <input> should not be displayed", () => {
            const component = create(<ProfileStatus profileStatus='Test-Status'/>);
            const root = component.root
            expect(() => root.findByType('input')).toThrow()
        })

        test("<input> should be displayed in editMode instead of <span>", () => {
            const component = create(<ProfileStatus profileStatus='Test-Status'/>);
            const root = component.root
            let span = root.findByType('span')
            span.props.onDoubleClick()
            let input = root.findByType('input')
            expect(input.type).toBe('input')
            expect(() => root.findByType('span')).toThrow()
        })

        test("callback shoul be called", () => {
            const mockCallback = jest.fn()
            const component = create(<ProfileStatus profileStatus='Test-Status' updateUserStatus={mockCallback}/>);
            const instance = component.getInstance()
            instance.deactivateEditMode()
            expect(mockCallback.mock.calls.length).toBe(1)
        })

    }
)
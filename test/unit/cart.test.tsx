import '@testing-library/jest-dom'
import {describe} from '@jest/globals';
// @ts-ignore
import events from '@testing-library/user-event';
import {MemoryRouter} from "react-router-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {render, screen} from "@testing-library/react";
import {Cart} from "../../src/client/pages/Cart";
import {Application} from "../../src/client/Application";

const cartMock2 = {
    567: {
        id: 567,
        name: 'Refined Bacon',
        price: 764,
        description: 'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals',
        color: 'Lavender',
        material: 'Frozen',
        count: 5
    },
    983: {
        id: 983,
        name: 'Generic Gloves',
        price: 165,
        description: 'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support',
        color: 'Turquoise',
        material: 'Frozen',
        count: 3
    },
}

describe('Корзина', () => {

    it('в шапке рядом со ссылкой на корзину должно отображаться количество не повторяющихся товаров в ней', () => {
        const initial = {
            cart: cartMock2,
        }
        const store = createStore(() => initial);

        render(
            <MemoryRouter initialEntries={['/']}>
                <Provider store={store}><Application/></Provider>
            </MemoryRouter>
        );

        expect(screen.getByText('Cart (2)')).toBeInTheDocument()
    })

    it('в корзине должна отображаться таблица с добавленными в нее товарами', () => {
        const initial = {
            cart: cartMock2,
        }
        const store = createStore(() => initial);

        render(
            <MemoryRouter initialEntries={['/cart']}>
                <Provider store={store}><Cart/></Provider>
            </MemoryRouter>,
        );

        expect(screen.getByText('Refined Bacon')).toBeInTheDocument();
        expect(screen.getByText('Generic Gloves')).toBeInTheDocument();
    });

    it('для каждого товара должны отображаться название, цена, количество , стоимость, а также должна отображаться общая сумма заказа', () => {

        const initial = {
            cart: cartMock2,
        }
        const store = createStore(() => initial);

        render(
            <MemoryRouter initialEntries={['/cart']}>
                <Provider store={store}><Cart/></Provider>
            </MemoryRouter>
        );

        expect(screen.getByText('Refined Bacon')).toBeInTheDocument();
        expect(screen.getByText('Generic Gloves')).toBeInTheDocument();

        expect(screen.getByText('$764')).toBeInTheDocument();
        expect(screen.getByText('$165')).toBeInTheDocument();

        expect(screen.getByText('5')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();

        expect(screen.getByText('$3820')).toBeInTheDocument();
        expect(screen.getByText('$495')).toBeInTheDocument();

        expect(screen.getByText('$4315')).toBeInTheDocument();

    })
    it('если корзина пустая, должна отображаться ссылка на каталог товаров', async () => {

        const initial = {
            cart: {},
        }
        const store = createStore(() => initial);

        render(
            <MemoryRouter initialEntries={['/cart']}>
                <Provider store={store}><Cart/></Provider>
            </MemoryRouter>
        );

        const catalogLink = screen.getByRole('link', {name: 'catalog'});
        expect(catalogLink).toBeInTheDocument();

    })
})
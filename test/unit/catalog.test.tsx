import '@testing-library/jest-dom'
import {describe} from "@jest/globals";
import {CartState} from "../../src/common/types";
import {BrowserRouter} from "react-router-dom";
import {createStore} from "redux";
import {Catalog} from "../../src/client/pages/Catalog";
import * as reactRedux from "react-redux";
import {Provider} from "react-redux";
import {render, screen} from "@testing-library/react";
import {Product} from "../../src/client/pages/Product";
import {addToCart, initStore} from "../../src/client/store";
import {CartApi, ExampleApi} from "../../src/client/api";

export const mockData = [
    {
        id: 567,
        name: 'Refined Bacon',
        price: 764,
        description: 'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals',
        color: 'Lavender',
        material: 'Frozen'
    },
    {
        id: 983,
        name: 'Generic Gloves',
        price: 165,
        description: 'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support',
        color: 'Turquoise',
        material: 'Frozen'
    },
    {
        id: 1468,
        name: 'Tasty Bacon',
        price: 101,
        description: 'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals',
        color: 'Olive',
        material: 'Wooden'
    },
];

export const mockProduct = {
    id: 567,
    name: 'Refined Bacon',
    description: 'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals',
    price: 764,
    color: 'Lavender',
    material: 'Frozen'
}

const mockCart = {
    [mockProduct.id]: {count: 4, name: mockProduct.name, price: mockProduct.price}
}

describe("Каталог", () => {
    it('в каталоге должны отображаться товары, список которых приходит с сервера', () => {
        const initial = {
            cart: {} as CartState,
            products: mockData
        }
        const store = createStore(() => initial);
        render(
            <BrowserRouter basename={'/'}>
                <Provider store={store}><Catalog/></Provider>
            </BrowserRouter>);

        mockData.forEach((product) => {
            expect(screen.getByText(product.name)).toBeInTheDocument();
            expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
        });
    })
    it('для каждого товара в каталоге отображается название, цена и ссылка на страницу с подробной информацией о товаре', () => {

        const initial = {
            cart: {} as CartState,
            products: mockData
        }
        const store = createStore(() => initial);
        const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
        useSelectorMock.mockReturnValue(mockData);

        render(
            <BrowserRouter basename={'/'}>
                <Provider store={store}><Catalog/></Provider>
            </BrowserRouter>)

        mockData.forEach((product) => {
            expect(screen.getByText(product.name)).toBeInTheDocument();
            expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
        });


        const links = screen.queryAllByText('Details');
        let count = 0
        let ids = [567, 983, 1468]

        links.forEach(link => {
            expect(link).toHaveAttribute('href', `/catalog/${ids[count]}`)
            count++
        })
    })
    it('на странице с подробной информацией отображаются: название товара, его описание, цена, цвет, материал и кнопка "добавить в корзину"', () => {
        const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
        useSelectorMock.mockReturnValue(mockProduct);

        const initial = {
            cart: {} as CartState,
            products: mockData
        }
        const store = createStore(() => initial);
        render(
            <BrowserRouter basename={'/'}>
                <Provider store={store}><Product/></Provider>
            </BrowserRouter>);

        expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
        expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
        expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument();
        expect(screen.getByText(mockProduct.color)).toBeInTheDocument();
        expect(screen.getByText(mockProduct.material)).toBeInTheDocument();
        expect(screen.getByText('Add to Cart')).toBeInTheDocument();
    })
    it("если товар уже есть в корзине, то при повторном добавлении изменится его счетчик", () => {
        const store = initStore(new ExampleApi('/'), new CartApi())

        store.dispatch(addToCart(mockProduct));
        store.dispatch(addToCart(mockProduct));

        const cart = store.getState().cart;
        expect(cart[mockProduct.id]?.count).toBe(2);
    });
});
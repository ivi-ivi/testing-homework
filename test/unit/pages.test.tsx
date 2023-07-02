import {render, screen} from "@testing-library/react";
import {Application} from "../../src/client/Application";
import '@testing-library/jest-dom'
import {Home} from "../../src/client/pages/Home";
import {Delivery} from "../../src/client/pages/Delivery";
import {Contacts} from "../../src/client/pages/Contacts";
import {createStore} from "redux";
import {mockData} from "./catalog.test";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {CartState} from "../../src/common/types";


describe("Страницы", () => {
    it('в магазине должны быть страницы: главная, каталог, условия доставки, контакты', () => {
        const initial = {
            cart: {} as CartState,
            products: mockData
        }
        const store = createStore(() => initial);
        render(
            <BrowserRouter basename={'/'}>
                <Provider store={store}><Application/></Provider>
            </BrowserRouter>);

        expect(screen.getByText('Catalog')).toBeInTheDocument();
        expect(screen.getByText('Delivery')).toBeInTheDocument();
        expect(screen.getByText('Contacts')).toBeInTheDocument();
    })
    it('страницы главная, условия доставки, контакты должны иметь статическое содержимое', () => {
        render(<Home/>);

        expect(screen.getByText('Welcome to Example store!')).toBeInTheDocument();
        expect(screen.getByText('Culpa perspiciatis corporis facilis fugit similique')).toBeInTheDocument();
        expect(screen.getByText('Cum aut ut eveniet rem cupiditate natus veritatis quia')).toBeInTheDocument();
        expect(screen.getByText('Odio aut assumenda ipsam amet reprehenderit. ' +
            'Perspiciatis qui molestiae qui tempora quisquam')).toBeInTheDocument();
        expect(screen.getByText('Ut nisi distinctio est non voluptatem. Odio aut assumenda ipsam amet reprehenderit')).toBeInTheDocument();
        expect(screen.getByText('Perspiciatis qui molestiae qui tempora quisquam. Ut nisi distinctio est non voluptatem')).toBeInTheDocument();
        expect(screen.getByText('Sed voluptatum quis voluptates laudantium incidunt laudantium. Illo non quos eos vel ipsa.' +
            ' Explicabo itaque est optio neque rerum provident enim qui sed. Corrupti commodi voluptatem vero soluta hic.')).toBeInTheDocument();
        expect(screen.getByText('Modi corporis consectetur aliquid sit cum tenetur enim.' +
            ' Sed voluptatum quis voluptates laudantium incidunt laudantium. ' +
            'Illo non quos eos vel ipsa. Explicabo itaque est optio neque rerum provident enim qui sed. ' +
            'Corrupti commodi voluptatem vero soluta hic.')).toBeInTheDocument();


        render(<Delivery/>);

        expect(screen.getByText('Delivery')).toBeInTheDocument();
        expect(screen.getByText('Dolores magnam consequatur iste aliquam qui sint non ab. ' +
            'Culpa saepe omnis. Recusandae vel aperiam voluptates harum. Perspiciatis qui molestiae qui tempora quisquam. ' +
            'Mollitia voluptatum minus laboriosam. Dolor maiores possimus repudiandae praesentium hic eos. Veritatis et repellat.')).toBeInTheDocument();

        render(<Contacts/>);

        expect(screen.getByText('Contacts')).toBeInTheDocument();
        expect(screen.getByText('Molestias inventore illum architecto placeat molestias ipsam facilis ab quo.' +
            ' Rem dolore cum qui est reprehenderit assumenda voluptatem nisi ipsa. Unde libero quidem. Excepturi maiores vel quia. ' +
            'Neque facilis nobis minus veniam id. Eum cum eveniet accusantium molestias voluptas aut totam laborum aut. ' +
            'Ea molestiae ullam et. Quis ea ipsa culpa eligendi ab sit ea error suscipit. Quia ea ut minus distinctio quam eveniet nihil. ' +
            'Aut voluptate numquam ipsa dolorem et quas nemo.')).toBeInTheDocument();
        expect(screen.getByText('Ut non consequatur aperiam ex dolores. Voluptatum harum consequatur est totam. Aut voluptatum aliquid aut optio et ea. ' +
            'Quaerat et eligendi minus quasi. Culpa voluptatem voluptatem dolores molestiae aut quos iure.' +
            ' Repellat aperiam ut aliquam iure. Veritatis magnam quisquam et dolorum recusandae aut.')).toBeInTheDocument();
    });
});
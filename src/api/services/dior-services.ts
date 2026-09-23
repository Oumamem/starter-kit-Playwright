import * as DiorRequester from '../requesters/dior-requesters';


export async function addProductToBasket(cdcBasketId: string, productSku: string, quantity: number): Promise<void> {
    let requestBody = JSON.stringify([{"product_id": productSku,"quantity":quantity}]);
    const responseContent = await DiorRequester.performPostRequest(`/baskets/${cdcBasketId}/items`, requestBody);
}


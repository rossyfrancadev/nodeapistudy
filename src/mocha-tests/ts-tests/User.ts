import { expect } from 'chai';
import FacadeUser from '../utils/FacadeUser';

describe('/usuarios', function () {

    it('incluir usuário', async () => {
        let res = await FacadeUser.newUser();
        expect(res.status).to.equals(200);
        console.log(res.body);
    });
});
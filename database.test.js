const db = require('./database');

beforeAll(async () => {
    await db.sequelize.sync({ force: true });
});

test('create oscillation', async () => {
    expect.assertions(1);
    const osc = await db.Oscillation.create({
        first_ticker: 'USD',
        second_ticker: 'BTC',
        rate: 5000,
        percent: '0.01',
        alerted_ask_price: '0.00002047'

    });
    expect(osc.id).toEqual(1);
});

test('get oscillation', async () => {
    expect.assertions(2);
    const osc = await db.Oscillation.findByPk(1);
    expect(osc.first_ticker).toEqual('USD');
    expect(osc.rate).toEqual(5000);
});

test('delete oscillation', async () => {
    expect.assertions(1);
    await db.Oscillation.destroy({
        where: {
            id: 1
        }
    });
    const osc = await db.Oscillation.findByPk(1);
    expect(osc).toBeNull();
});

afterAll(async () => {
    await db.sequelize.close();
});
'use strict';

const R = require('ramda');
const axios = require('axios');

const config = require('./config');

const getAvailableSeats = async performanceId => axios({
  method: 'GET',
  url: `https://my.laphil.com/en/rest-proxy/TXN/Performances/${performanceId}/Seats?constituentId=0&modeOfSaleId=4&performanceId=${performanceId}`,
});

const getAvailablePrices = async performanceId => axios({
  method: 'GET',
  url: `https://my.laphil.com/en/rest-proxy/TXN/Performances/Prices?expandPerformancePriceType=&includeOnlyBasePrice=&modeOfSaleId=4&performanceIds=${performanceId}&priceTypeId=&sourceId=6259`,
});

const formatTickets = (seats, prices) =>
  R.pipe(
    R.map(R.pick(['SectionId', 'SeatRow', 'SeatNumber', 'ZoneId'])),
    R.map(s => ({
      Row: s.SeatRow,
      Section: s.SectionId,
      SeatNumber: s.SeatNumber,
      Price: R.find(R.eqProps('ZoneId', s))(prices).Price
    }))
  )(seats);

module.exports = {
  async getTickets(performanceId) {
    const loadData = id => Promise.all([
      getAvailableSeats(id),
      getAvailablePrices(id),
    ]);

    const [seats, prices] = await loadData(performanceId);
    return formatTickets(seats.data, prices.data);
  }
};

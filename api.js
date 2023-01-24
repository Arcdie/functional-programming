// Вирішив залишити express і зробити хоча б api

const R = require('ramda');
const axios = require('axios');

const config = require('./config');

const performanceId = 7301;

const getAvailableSeats = async performanceId => axios({
  method: 'GET',
  url: `https://my.laphil.com/en/rest-proxy/TXN/Performances/7301/Seats?constituentId=0&modeOfSaleId=4&performanceId=${performanceId}`,
});

const getAvailablePrices = async performanceId => axios({
  method: 'GET',
  url: `https://my.laphil.com/en/rest-proxy/TXN/Performances/Prices?expandPerformancePriceType=&includeOnlyBasePrice=&modeOfSaleId=4&performanceIds=${performanceId}&priceTypeId=&sourceId=6259`,
});

const getTickets = R.curry((seats, prices) => {
  return R.pipe(
    R.map(seat => ({
      section: seat.SectionId,
      row: seat.SeatRow,
      seatNumber: seat.SeatNumber,
    })),
    R.curry((seats) => {
      return R.pipe(

      );

      return R.map(seat => ({

      })),
    }),
  )(seats);
});

(async () => {
  const [seats, prices] = await Promise.all([
    getAvailableSeats(performanceId),
    getAvailablePrices(performanceId),
  ]);

  // console.log('prices.data', prices.data);
  console.log('getTickets', getTickets(seats.data, prices.data));
})();

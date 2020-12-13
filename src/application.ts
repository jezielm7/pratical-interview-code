import { Investment, Loan, MarketplaceItem, Category } from './types';


export const generateMarketplaceList = (
  loanList: Loan[], 
  investmentList: Investment[]
  ): MarketplaceItem[] => {
    const mktPlaceFormatted = loanList.map(loan => {
    const totalInvestment = investmentList.filter(
      investment => investment.loanId === loan.id
    )
    const totalInvestmentAmount = totalInvestment.reduce((acc, current) => {
      return acc + current.totalInvestedAmountCents;
    }, 0)
    return {
      id: loan.id,
      totalRequestedAmount: loan.totalRequestedAmountCents / 100,
      category: loan.category,
      totalInvestmentAmount: totalInvestmentAmount / 100,
      expiresAt: loan.expiresAt
    }
  })
  return mktPlaceFormatted.sort(sortList);
}

function formatCategory (category: Category) {
  if (category === Category.Z) {
    return 3;
  }

  if (category === Category.X) {
    return 2;
  }

  if (category === Category.Y) {
    return 1;
  }
}

function sortList(a: MarketplaceItem, b: MarketplaceItem) {
  if(formatCategory(a.category) > formatCategory(b.category)) {
    return -1;
  }
  if(formatCategory(a.category) < formatCategory(b.category)) {
    return 1;
  }

  if(formatCategory(a.category) === formatCategory(b.category)) {
    if(a.expiresAt > b.expiresAt) {
      return 1;
    }
    if(a.expiresAt < b.expiresAt) {
      return -1;
    }
    return 0;
  }
}
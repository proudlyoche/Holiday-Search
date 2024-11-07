import React, { ComponentProps } from "react";
import { mount } from "cypress/react18";
import FilterPanel, { FACILITIES } from "../components/card/side-panel-card";
import { Filters } from "@/types/booking";

type FilterPanelComponent = (props: {
  filters: Filters;
  onFilterChange: (newFilters: Filters) => void;
  minPrice: number;
  maxPrice: number;
}) => JSX.Element;

type FilterPanelProps = ComponentProps<FilterPanelComponent>;

describe("Filter Panel", () => {
  let onFilterChangeStub: ReturnType<typeof cy.stub>;
  let defaultProps: FilterPanelProps;

  beforeEach(() => {
    onFilterChangeStub = cy.stub().as("onFilterChange");

    defaultProps = {
      filters: {
        priceRange: [0, 100],
        facilities: [],
        starRating: null,
      },
      onFilterChange: onFilterChangeStub,
      minPrice: 0,
      maxPrice: 300,
    };

    mount(<FilterPanel {...defaultProps} />);
  });

  describe("Facility Selection", () => {
    FACILITIES.forEach((facility) => {
      it(`should handle ${facility.id} selection`, () => {
        cy.log(`Checking facility: ${facility.label}`);
        cy.get(`[data-cy="facility-${facility.id}"]`)
          .should("exist")
          .should("be.visible")
          .check();
        cy.get("@onFilterChange").should("have.been.calledWith", {
          ...defaultProps.filters,
          facilities: [facility.id],
        });
      });
    });
  });

  describe("Accessibility and Text Content", () => {
    it("should have proper headings and labels", () => {
      cy.contains("h3", "Filters").should("exist");
      cy.contains("label", "Price Range").should("exist");
      cy.contains("label", "Facilities").should("exist");
      cy.contains("label", "Star Rating").should("exist");
    });

    it("should have proper facility labels with icons", () => {
      FACILITIES.forEach((facility) => {
        cy.contains("label", facility.label)
          .should("exist")
          .and("be.visible")
          .within(() => {
            cy.get('input[type="checkbox"]').should("exist");
            cy.get("svg").should("exist"); // Verify icon exists
          });
      });
    });

    it("should have proper star rating buttons", () => {
      [5, 4, 3, 2, 1].forEach((rating) => {
        cy.get(`[data-cy="star-rating-${rating}"]`)
          .should("exist")
          .and("be.visible")
          .and("contain", rating.toString())
          .within(() => {
            cy.get("svg").should("exist"); // Verify star icon exists
          });
      });
    });
  });
});

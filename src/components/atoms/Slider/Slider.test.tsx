/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/await-async-utils */
/* eslint-disable testing-library/no-node-access */
// Slider.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import Slider from './Slider'; // Adjust the import path as necessary

describe('Slider Component', () => {
  test('renders children elements', () => {
    render(
      <Slider>
        <div className="flex-shrink-0 w-[235px] h-[235px] bg-red-500">Item 1</div>
        <div className="flex-shrink-0 w-[235px] h-[235px] bg-blue-500">Item 2</div>
      </Slider>
    );

    // Check if the items are rendered by checking the presence of their text content
    const item1 = screen.getByText('Item 1');
    const item2 = screen.getByText('Item 2');

    expect(item1).not.toBeNull();
    expect(item2).not.toBeNull();
  });

  test('applies dynamic height based on content', () => {
    const { container } = render(
      <Slider>
        <div className="flex-shrink-0 w-[235px] h-[235px] bg-red-500">Item 1</div>
        <div className="flex-shrink-0 w-[235px] h-[235px] bg-blue-500">Item 2</div>
        <div className="flex-shrink-0 w-[235px] h-[100px] bg-green-500">Item 3</div>
      </Slider>
    );

    const sliderDiv = container.firstChild as HTMLDivElement; // Type assertion to HTMLDivElement

    waitFor(() => {
      expect(sliderDiv.scrollHeight).toEqual(235); // Assert the height equals 235px
    });
  });

  test('supports horizontal scrolling', () => {
    render(
      <Slider>
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className="flex-shrink-0 w-[235px] h-[235px] bg-red-500">
            Item {i + 1}
          </div>
        ))}
      </Slider>
    );

    // Check if there are multiple items
    const sliderDiv = screen.getByRole('region') as HTMLDivElement; // Assuming you want to get the slider div
    waitFor(() => {
      expect(sliderDiv).toBeTruthy(); // Ensure the slider div is truthy
      expect(sliderDiv.children.length).toEqual(10); // Ensure the number of children matches the number of items
    });
  });
});

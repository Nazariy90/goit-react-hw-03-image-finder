import axios from 'axios';

export const PER_PAGE = 12;

export async function getImages({ page, searchValue }) {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        q: searchValue,
        page,
        per_page: PER_PAGE,
        key: '35149323-7d9a8cd32882ff02286729e57',
        image_type: 'photo',
        orientation: 'horizontal',
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

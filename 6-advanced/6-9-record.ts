/**
 * utility - Record<K extends keyof any, T>
 * = map 자료구조와 비슷하게, 하나와 다른 하나를 연결하고 싶을 때, 하나를 Key로, 하나를 Value 로 연결할 수 있다.
 */
{
	type PageInfo = {
		title: string;
	}

	type Page = 'home' | 'about' | 'contact';

	const nav: Record<Page, PageInfo> = {
		home: { title: 'Home' },
		about: { title: 'About' },
		contact: { title: 'Contact' },
	}
}
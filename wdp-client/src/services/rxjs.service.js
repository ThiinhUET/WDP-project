import { BehaviorSubject } from 'rxjs';
import { defaultdata } from '../components/layouts/editor/sidebar/explorer/data';

export const dataFlow = new BehaviorSubject('data');
export const contentFlow = new BehaviorSubject("<!--Happy Coding-->");
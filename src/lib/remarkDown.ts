import { remark } from "remark"
import html from 'remark-html'

const RemarkDown = async (value: string) => {
  const result = await remark().use(html).process(value);
  return result.toString();
}

export default RemarkDown
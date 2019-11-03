export default function Tags(tags) {
  return `
        <div>
        <h3>Tags</h3>
        ${tags.docs
          .map(tag => {
            const tagData = tag.data();
            return `
                <span class='main-content__tags'>${tagData.tagName}</span>
                `;
          })
          .join('')}
        </div>
        `;
}

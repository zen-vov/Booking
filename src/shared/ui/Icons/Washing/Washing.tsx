import { SVGI } from "../Wifi/Wifi";

export default function Washing({ className }: SVGI) {
  return (
    <svg
      width="15"
      className={className}
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="15" height="15" fill="url(#pattern0_2134_871)" />
      <defs>
        <pattern
          id="pattern0_2134_871"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use href="#image0_2134_871" transform="scale(0.01)" />
        </pattern>
        <image
          id="image0_2134_871"
          width="100"
          height="100"
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGHklEQVR4nO2d24tVVRzHP2IzpdjFmcqmmugGQln5EkX1VkRq9WCp+RCChTmNIRHdECq7S1RGPfQPdDEss0wFe+lBnbQxhKwoECxzKkenGcecW55Y9TuxWa1z2fvss886a/8+8IPhzF6X8/ues26/394HFEVRFEVRFL9oBVYAPcAwUMi5DQM7gW7xTaacD+zxwAkFT60X6MhKDKO+ikFFUb4CWrIQZIUHn8BCk1hXFoL0WI1+IkNY3rkA+NTyzY4sGj5mNWo6ovzLhZZvhsgA+2upNNg/Kkh5VBDPUEE8QwWJQSewXiZbYxuAmSleb1BBqsQ494jDYUflf7VeX0QFqZL1ZTZwH6RwfREVpEqGyjh4MIXri6ggVVLOwX+kcH0RFaRKNpRx8LoUri+iglTJTJmQbYf1y5FHrdcXUUFi0CkT8qDYugrOjXu9QQXxDBXEM1QQz1BBPEMF8QwVxDNyJch5wCJgLbAV+EH2CmPAr8AuYAvwNvAgcB0wOeM+Bi9IG/CQJKHFyfiIns6+B8zNSJxgBekAXnckVdRiBySN6bQ69js4QVqARysc7tVqPwF3UR+CEuRymQfKOfMb4A1gPnClDGmniJm/Z8n/zDX7KtS1EWhP+T0EI8icMt+K34FnEibkmbyx1cDhEnX/DFyb4vsIQpClwLij7iOSjjklhTamSmb60RKZ6/NIh6YX5F7gL0e9W+qUFTkD+NjR3lhKojS1IGaYmrDqm8goSbnb0fafwA15FeRiCfZE6xoFFpIdi+SbEe1DX43J400pyGTHRm88xXE8Dnc45q9twKQ8CfKwo57HaBxPOvpjFhq5EKRdsjbse0wm0ThM25usPpll8hl5EGSNVX6gDpuzJJwjcfNo354OXZBpjje9Cn94yrEPmhKyIMsdO/DT8Ydpcowf7eOSkAX5IoUhod48a/Xx81AFaXMsL6/AP2ZZfTT7lLNCFGS+Ve5bmczvlwBSr0zwJv6xH/gIWAacmWLfTV0PSJrofmlrQNo2fbhPPjjfWX29M0RBXrDKmbH6hKO+gmVDEqgyO/ukXCJ1VBNjOeGYR8wwFpwg9jo/rk1IKqeJk1fL9ZIKap9ZxbWNGfgnMUkb/LpGpxQitk9iHLdK/u1UsU55bXUVwak4ticD/yQmaYN9Jd7sQeA54EYZ441jZ8sK7FCKTi3aIdlvzJa2TJs3Ac8Dv5Qo05eBfxKTtMERq9xvcl5kQq/lHnSzBNibghB7pa7WCvH8pdK3aNmRDPyTmKQNjlrlTKAoDrcAHzqELWcjcq/gzTHbmpEHQezYx7kJ258OLAbekgfhmNSe42IH5LU35Zo4+wc7Ic8+aAxOkB+tcmYD5ivXWH01GZLBCbLVKnc3/nKP1dfPQhRkrVXuRfxljdXX10IUxP7UmbHeV3qtvi4IURAziZ+MlJvw9OFnF1lpSebvs0MUxPV4wCfwj1VWH7fHLN9UgnQ7kp4zf8ZtGU6V1NJoH01QLVhB2hwPXY77huuJ/YEZkn1PsIIYXrXK98cco+tFuyMh++UE9TSdIB2Om3DeofG8b/VpMOFpQtMJYnjEUc8yGkeXoz8rE9bVlIK0yKO47dj1HLJnniO/98sKp9DBCWK4zJHBeBy4jeyYK21G+zAgIV/yJkipROexjIavLkfb4yISeRUECQhFd/AFsXdlmVyP1ZQ9gRekD3GT4oIUpNwtbYdln5LG5rFVHiZgx2WK34w0xAhGEMPtjjkluqN/vIqHh7nolCOagyXqHkhhmApSEMOlwO4Sjise9PXI0b25z/wqGdZaxczfV0us5SVZLbnuX4yupmqZwIMXBFlurnRkyadpw/KNS7q0zZUg0USDV1J+tMaQBJ+SxvNzLUiR6TIZ7yyxGqtkJ+UIfXmCg8IkBC+IfZfTQgmpbga+l1XTqFi/vLZZDjEXNODgMleCNAMqiGeoIJ6hgniGCuIZKohnqCCeoYJ4hgriGSpI3gWxby32MT83Vz9ObOfnmp+sVlH4R4xNjfj5bjvdUo2SPsgkTbbVcf+EGv/zwS7JP8uEDkeimxr/+WC3+ChTWiS3aXvKUb1Ck9qxSCAss2+GoiiKoiiKQhX8DXkv638nkxi8AAAAAElFTkSuQmCC"
        />
      </defs>
    </svg>
  );
}

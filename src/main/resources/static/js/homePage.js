document.addEventListener("DOMContentLoaded", () => {
    const svg = document.getElementById('hex-cycle-svg');
    const nodesGroup = svg.getElementById('nodes');
    const flowsGroup = svg.getElementById('flows');

    const cx = 350, cy = 350;
    const arrowRadius = 170;
    const nodeCenterRadius = 220;
    const hexOuter = 50;

    const nodeIcons = ['🐝','🌺','🪱','🐟','🐍','🥬'];
    const nodeLabels = ['Ong','Hoa Trang','Trùn Quế','Cá Trê','Rắn Ri Voi','Rau'];
    const nodeInfo = [
        "Tăng năng suất nhờ thụ phấn tự nhiên",
        "Nguồn dược liệu bản địa, mật hoa nuôi ong",
        "Xử lý phế phẩm, tạo phân hữu cơ",
        "Nuôi bằng phụ phẩm, cung cấp thức ăn cho rắn",
        "Được nuôi bằng cá trê, giá trị dược liệu",
        "Sử dụng nước thải đã xử lý từ hệ sinh thái"
    ];

    const angles = [-90, -30, 30, 90, 150, 210];
    const toRad = d => d * Math.PI / 180;

    const nodeCenters = angles.map(a => {
        const rad = toRad(a);
        return {
            cx: cx + nodeCenterRadius * Math.cos(rad),
            cy: cy + nodeCenterRadius * Math.sin(rad),
            angle: a
        };
    });

    function hexPoints(x, y, s) {
        const pts = [];
        for (let i = 0; i < 6; i++) {
            const angDeg = -90 + 60 * i;
            const rad = toRad(angDeg);
            pts.push(`${x + s * Math.cos(rad)},${y + s * Math.sin(rad)}`);
        }
        return pts.join(' ');
    }

    // Tooltip bằng foreignObject
    const fo = document.createElementNS('http://www.w3.org/2000/svg','foreignObject');
    fo.setAttribute('id','tooltip-fo');
    fo.setAttribute('x', cx - 80);
    fo.setAttribute('y', cy + 40);
    fo.setAttribute('width',160);
    fo.setAttribute('height',80);

    const div = document.createElement('div');
    div.setAttribute('xmlns','http://www.w3.org/1999/xhtml');
    div.style.display = 'none';
    div.style.fontSize = '14px';
    div.style.color = '#2d5016';
    div.style.textAlign = 'center';

    fo.appendChild(div);
    svg.appendChild(fo);

    // Vẽ node
    nodeCenters.forEach((n, idx) => {
        const g = document.createElementNS('http://www.w3.org/2000/svg','g');
        g.setAttribute('class','hex-group');

        const poly = document.createElementNS('http://www.w3.org/2000/svg','polygon');
        poly.setAttribute('class','hex-polygon');
        poly.setAttribute('points', hexPoints(n.cx, n.cy, hexOuter));
        g.appendChild(poly);

        const icon = document.createElementNS('http://www.w3.org/2000/svg','text');
        icon.setAttribute('x', n.cx);
        icon.setAttribute('y', n.cy - 6);
        icon.setAttribute('text-anchor','middle');
        icon.setAttribute('font-size','28');
        icon.textContent = nodeIcons[idx];
        g.appendChild(icon);

        const label = document.createElementNS('http://www.w3.org/2000/svg','text');
        label.setAttribute('x', n.cx);
        label.setAttribute('y', n.cy + 18);
        label.setAttribute('text-anchor','middle');
        label.setAttribute('font-size','13');
        label.setAttribute('fill','#2d5016');
        label.setAttribute('font-weight','600');
        label.textContent = nodeLabels[idx];
        g.appendChild(label);

        // hover event show tooltip
        g.addEventListener('mouseenter', () => {
            div.textContent = nodeInfo[idx];
            div.style.display = 'block';
        });
        g.addEventListener('mouseleave', () => {
            div.style.display = 'none';
        });

        nodesGroup.appendChild(g);
    });

    // Vẽ mũi tên
    const offsetAngleRad = Math.asin(hexOuter / nodeCenterRadius);
    const offsetDeg = (offsetAngleRad * 180 / Math.PI) + 8;
    for (let i = 0; i < angles.length; i++) {
        let a1 = angles[i], a2 = angles[(i + 1) % angles.length];
        let startDeg = a1 + offsetDeg, endDeg = a2 - offsetDeg;
        while (startDeg < 0) startDeg += 360;
        while (endDeg < 0) endDeg += 360;
        if (endDeg <= startDeg) endDeg += 360;

        const sx = cx + arrowRadius * Math.cos(toRad(startDeg));
        const sy = cy + arrowRadius * Math.sin(toRad(startDeg));
        const ex = cx + arrowRadius * Math.cos(toRad(endDeg));
        const ey = cy + arrowRadius * Math.sin(toRad(endDeg));

        const path = document.createElementNS('http://www.w3.org/2000/svg','path');
        path.setAttribute('class','flow');
        path.setAttribute('d', `M ${sx.toFixed(3)} ${sy.toFixed(3)} A ${arrowRadius} ${arrowRadius} 0 0 1 ${ex.toFixed(3)} ${ey.toFixed(3)}`);
        path.setAttribute('marker-end','url(#arrow)');
        flowsGroup.appendChild(path);
    }
});
